import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import {
  PopulatedFlagEnv,
  PopulatedStrategy,
  QueuedFlagHit,
  Variant,
} from '../flags/types';
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
import { QueuedEventHit } from './types';
import { RuleService } from '../rule/rule.service';
import { Environment } from '../environments/types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { minimatch } from 'minimatch';
import { IQueuingService } from '../queuing/types';
import { MakeQueuingService } from '../queuing/queuing.service.factory';
import { KafkaTopics } from '../queuing/topics';

@Injectable()
export class SdkService {
  private queuingService: IQueuingService;

  constructor(
    private prisma: PrismaService,
    private readonly envService: EnvironmentsService,
    private readonly scheduleService: SchedulingService,
    private readonly flagService: FlagsService,
    private readonly ruleService: RuleService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.queuingService = MakeQueuingService();
  }

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

    const queuedFlagHit: QueuedFlagHit = {
      flagId: flagEnv.flagId,
      envId: flagEnv.environmentId,
      visitorId: String(fields?.id || ''),
      valueResolved: String(flagStatusRecord),
    };

    await this.queuingService.send(KafkaTopics.FlagHits, queuedFlagHit);

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
      const queuedFlagHit: QueuedFlagHit = {
        flagId: nextFlag.flagId,
        envId: nextFlag.environmentId,
        visitorId: String(fields?.id || ''),
        valueResolved: String(flagStatusOrVariant),
      };

      await this.queuingService.send(KafkaTopics.FlagHits, queuedFlagHit);
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

  async generateTypescriptTypes(secretKey: string) {
    const env = await this.prisma.environment.findFirst({
      where: { secretKey },
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

  async hitEvent(envId: string, queuedEvent: QueuedEventHit) {
    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.event.create({
      data: {
        environmentUuid: envId,
        visitorId: queuedEvent.visitorId,
        date,
        name: queuedEvent.name,
        os: queuedEvent.os,
        browser: queuedEvent.browser,
        url: queuedEvent.url || null,
        referer: queuedEvent.referer,
        data: queuedEvent.data
          ? typeof queuedEvent.data === 'object'
            ? JSON.stringify(queuedEvent.data)
            : String(queuedEvent.data)
          : null,
      },
    });
  }

  async resolveQueuedHit(queuedEvent: QueuedEventHit) {
    if (!queuedEvent.secretKey && !queuedEvent.clientKey) {
      return this.logger.error({
        error: 'Invalid secret key or client key provided',
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });
    }

    const concernedEnv = await this.getEnvByKeys(
      queuedEvent.clientKey,
      queuedEvent.secretKey,
    );

    if (!concernedEnv) {
      return this.logger.error({
        error: 'The client key does not match any environment',
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });
    }

    const domain = queuedEvent.domain;

    if (
      !queuedEvent.secretKey &&
      queuedEvent.clientKey &&
      (!concernedEnv.domain || !minimatch(domain, concernedEnv.domain))
    ) {
      return this.logger.error({
        error: 'The client key does not match the authorized domains',
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });
    }

    return this.hitEvent(concernedEnv.uuid, queuedEvent);
  }
}
