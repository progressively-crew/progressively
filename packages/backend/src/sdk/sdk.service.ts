import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import { PopulatedFlagEnv, PopulatedStrategy, Variant } from '../flags/types';
import { FieldRecord } from '../rule/types';
import { EventHit } from './types';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { genBucket, getVariation, isInBucket } from './utils';
import { SchedulingService } from '../scheduling/scheduling.service';
import { SegmentsService } from '../segments/segments.service';
import { RuleService } from '../rule/rule.service';
import { ValueToServe } from '../strategy/types';

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly envService: EnvironmentsService,
    private readonly scheduleService: SchedulingService,
    private readonly segmentService: SegmentsService,
    private readonly flagService: FlagsService,
    private readonly ruleService: RuleService,
  ) {}

  resolveUserId(params: FieldRecord, cookieUserId?: string) {
    if (params?.id) {
      // User exists, but initial request
      return String(params.id);
    }

    if (cookieUserId) {
      // User exists, subsequent requests
      return cookieUserId;
    }

    // first visit but anonymous
    return nanoid();
  }

  parseBase64Params(b64: string): FieldRecord {
    try {
      return JSON.parse(Buffer.from(b64, 'base64').toString('ascii'));
    } catch (e) {
      throw new BadRequestException();
    }
  }

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    if (flagEnv.status !== FlagStatus.ACTIVATED) return false;
    if (flagEnv.strategies.length === 0) return true;

    const valueFromStrategy = this.resolveStrategies(
      flagEnv.flag.key,
      flagEnv.strategies,
      fields,
    );

    return valueFromStrategy;

    // const userVariant = this.getUserVariant(flagEnv, fields);

    // if (Boolean(userVariant)) {
    //   return userVariant;
    // }

    // return false;
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

      if (strategy.valueToServeType === ValueToServe.Boolean) {
        if (isMatching) {
          const inBucket = this.isInBucket(flagKey, strategy, fields);

          if (inBucket) {
            return true;
          }
        }
      }

      if (strategy.valueToServeType === ValueToServe.String) {
        if (isMatching) {
          const inBucket = this.isInBucket(flagKey, strategy, fields);

          if (inBucket) {
            return strategy.valueToServe;
          }
        }
      }

      if (strategy.valueToServeType === ValueToServe.Variant) {
        if (!isMatching) {
          // Give back the control variant when it does not match any variant
          const controlVariant = strategy.variants.find(
            (variant) => variant.variant.isControl,
          )!;

          return controlVariant.variant.value;
        }

        const bucketId = genBucket(flagKey, fields.id as string);
        const variantResolved = getVariation(bucketId, strategy.variants);

        return variantResolved;
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

    let valueResolved;
    if (typeof flagStatusRecord === 'object') {
      valueResolved = 'flagStatusRecord.value';
    } else {
      valueResolved = flagStatusRecord;
    }

    await this.flagService.hitFlag(
      flagEnv.environmentId,
      flagEnv.flagId,
      String(fields?.id || ''),
      String(valueResolved),
    );

    return {
      [flagEnv.flag.key]: valueResolved,
    };
  }

  async resolveSdkFlags(fields: FieldRecord, skipHit: boolean) {
    const clientKey = String(fields.clientKey);
    const flagEnvs = await this.envService.getFlagEnvironmentByClientKey(
      clientKey,
    );

    const flags = {};

    for (const flagEnv of flagEnvs) {
      let nextFlag = flagEnv;

      if (flagEnv.scheduling.length > 0) {
        nextFlag = await this.scheduleService.manageFlagScheduling(
          clientKey,
          flagEnv,
        );
      }

      const flagStatusOrVariant = this.resolveFlagStatus(nextFlag, fields);

      if (typeof flagStatusOrVariant === 'object') {
        flags[nextFlag.flag.key] = 'flagStatusOrVariant.value';
      } else {
        flags[nextFlag.flag.key] = flagStatusOrVariant;
      }

      if (!skipHit) {
        let valueResolved = '';
        if (typeof flagStatusOrVariant === 'object') {
          valueResolved = 'flagStatusOrVariant.value';
        } else {
          valueResolved = String(flagStatusOrVariant);
        }
        await this.flagService.hitFlag(
          nextFlag.environmentId,
          nextFlag.flagId,
          String(fields?.id || ''),
          valueResolved,
        );
      }
    }

    return flags;
  }

  async hitEvent(clientKey: string, visitorId: string, hit: EventHit) {
    const metric = await this.prisma.pMetric.findFirst({
      where: {
        name: hit.name,
        flagEnvironment: {
          environment: {
            clientKey,
          },
        },
      },
    });

    if (!metric) {
      return null;
    }

    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.pMetricHit.create({
      data: {
        flagEnvironmentFlagId: metric.flagEnvironmentFlagId,
        flagEnvironmentEnvironmentId: metric.flagEnvironmentEnvironmentId,
        pMetricUuid: metric.uuid,
        visitorId,
        date,
        data:
          typeof hit.data === 'object'
            ? JSON.stringify(hit.data)
            : String(hit.data),
      },
    });
  }
}
