import { Injectable } from '@nestjs/common';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import { PopulatedFlagEnv, PopulatedStrategy, Variant } from '../flags/types';
import { FieldRecord } from '../rule/types';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import {
  genBucket,
  getStringOfTypes,
  getStringOfTypesWithCustomStrings,
  getVariation,
  isInBucket,
} from './utils';
import { SchedulingService } from '../scheduling/scheduling.service';
import { ValueToServe } from '../strategy/types';
import { EventHit } from './types';
import { RuleService } from '../rule/rule.service';
import { Environment } from '../environments/types';

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly envService: EnvironmentsService,
    private readonly scheduleService: SchedulingService,
    private readonly flagService: FlagsService,
    private readonly ruleService: RuleService,
  ) {}

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    if (flagEnv.status !== FlagStatus.ACTIVATED) return false;
    if (flagEnv.strategies.length === 0) return true;

    return this.resolveStrategies(flagEnv.flag.key, flagEnv.strategies, fields);
  }

  resolveStrategies(
    flagKey: string,
    strategies: Array<PopulatedStrategy>,
    fields: FieldRecord,
  ) {
    for (const strategy of strategies) {
      const isMatching = this.ruleService.isMatchingAtLeastOneRule(
        strategy.rules,
        fields,
      );

      if (!isMatching) continue;

      if (strategy.valueToServeType === ValueToServe.Boolean) {
        const inBucket = this.isInBucket(flagKey, strategy, fields);

        if (inBucket) {
          return true;
        }
      }

      if (strategy.valueToServeType === ValueToServe.String) {
        const inBucket = this.isInBucket(flagKey, strategy, fields);

        if (inBucket) {
          return strategy.valueToServe;
        }
      }

      if (strategy.valueToServeType === ValueToServe.Variant) {
        const bucketId = genBucket(flagKey, fields.id as string);

        return getVariation(bucketId, strategy.variants);
      }
    }

    return false;
  }

  private isInBucket(
    flagKey: string,
    strategy: PopulatedStrategy,
    fields: FieldRecord,
  ): boolean | Variant {
    if (strategy.rolloutPercentage === 0) return false;
    if (strategy.rolloutPercentage === 100) return true;

    const bucketId = genBucket(flagKey, fields.id as string);
    return isInBucket(bucketId, strategy.rolloutPercentage);
  }

  async resolveFlagStatusRecord(
    flagEnv: PopulatedFlagEnv,
    fields: FieldRecord,
  ) {
    const flagStatusRecord = this.resolveFlagStatus(flagEnv, fields);

    await this.flagService.hitFlag(
      flagEnv.environmentId,
      flagEnv.flagId,
      String(fields?.id || ''),
      String(flagStatusRecord),
    );

    return {
      [flagEnv.flag.key]: flagStatusRecord,
    };
  }

  async computeFlag(
    flagEnv: PopulatedFlagEnv,
    fields: FieldRecord,
    flagsByRef: Record<string, boolean | string>,
    skipHit: boolean,
  ) {
    let nextFlag = flagEnv;

    if (flagEnv.scheduling.length > 0) {
      nextFlag = await this.scheduleService.manageFlagScheduling(flagEnv);
    }

    const flagStatusOrVariant = this.resolveFlagStatus(nextFlag, fields);

    flagsByRef[nextFlag.flag.key] = flagStatusOrVariant;

    if (!skipHit) {
      await this.flagService.hitFlag(
        nextFlag.environmentId,
        nextFlag.flagId,
        String(fields?.id || ''),
        String(flagStatusOrVariant),
      );
    }
  }

  getEnvByKeys(clientKey?: string, secretKey?: string) {
    return this.prisma.environment.findFirst({
      where: {
        clientKey,
        secretKey,
      },
    });
  }

  async computeFlags(env: Environment, fields: FieldRecord, skipHit: boolean) {
    const flagEnvs = await this.envService.getPopulatedFlagEnvs(env.uuid);

    const flags = {};

    const promises = flagEnvs.map((flagEnv) =>
      this.computeFlag(flagEnv, fields, flags, skipHit),
    );

    await Promise.all(promises);

    return flags;
  }

  async generateTypescriptTypes(clientKey: string) {
    const env = await this.prisma.environment.findFirst({
      where: { clientKey },
      include: {
        flagEnvironment: {
          include: {
            variants: true,
            flag: true,
          },
        },
      },
    });

    const defaultDefinition = getStringOfTypes(env.flagEnvironment as any);
    const definitionWithCustomString = getStringOfTypesWithCustomStrings(
      env.flagEnvironment as any,
    );

    return `declare module "@progressively/types" { \n${defaultDefinition}\n\n${definitionWithCustomString}\n}`;
  }

  async hitEvent(
    clientKey: string,
    visitorId: string,
    hit: EventHit & {
      os: string;
      browser: string;
      url: string;
      referer?: string;
    },
  ) {
    const env = await this.prisma.environment.findFirst({
      where: {
        clientKey,
      },
    });

    if (!env) {
      return null;
    }

    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.event.create({
      data: {
        environmentUuid: env.uuid,
        visitorId,
        date,
        name: hit.name,
        os: hit.os,
        browser: hit.browser,
        url: hit.url,
        referer: hit.referer,
        data: hit.data
          ? typeof hit.data === 'object'
            ? JSON.stringify(hit.data)
            : String(hit.data)
          : null,
      },
    });
  }
}
