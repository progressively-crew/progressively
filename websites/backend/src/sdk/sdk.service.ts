import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  PopulatedFlag,
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
import { ValueToServe } from '../strategy/types';
import { QueuedEventHit } from './types';
import { RuleService } from '../rule/rule.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IQueuingService } from '../queuing/types';
import { KafkaTopics } from '../queuing/topics';
import { FlagsService } from '../flags/flags.service';
import { Project } from '@progressively/database';
import { StrategyService } from '../strategy/strategy.service';
import { EventsService } from '../events/events.service';
import { ICachingService } from '../caching/types';
import { projectEpochKey, sdkB64EpochToEntryKey } from '../caching/keys';

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly flagService: FlagsService,
    private readonly ruleService: RuleService,
    private readonly strategyService: StrategyService,
    private readonly eventService: EventsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
    @Inject('CachingService') private readonly cachingService: ICachingService,
  ) {}

  resolveFlagStatus(flag: PopulatedFlag, fields: FieldRecord) {
    if (flag.status !== FlagStatus.ACTIVATED) return false;
    if (flag.strategies.length === 0) return true;

    return this.resolveStrategies(flag.key, flag.strategies, fields);
  }

  resolveStrategies(
    flagKey: string,
    strategies: Array<PopulatedStrategy>,
    fields: FieldRecord,
  ) {
    for (const strategy of strategies) {
      const isValidStrategyDate =
        this.strategyService.isValidStrategyDate(strategy);

      if (!isValidStrategyDate) continue;

      const isMatching = this.ruleService.isMatchingAllRules(
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

        if (strategy.variants.length === 0) return false;

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

  async resolveFlagStatusRecord(flag: PopulatedFlag, fields: FieldRecord) {
    const flagStatusRecord = this.resolveFlagStatus(flag, fields);

    const queuedFlagHit: QueuedFlagHit = {
      flagId: flag.uuid,
      visitorId: String(fields?.id || ''),
      valueResolved: String(flagStatusRecord),
    };

    await this.queuingService.send(KafkaTopics.FlagHits, queuedFlagHit);

    return {
      [flag.key]: flagStatusRecord,
    };
  }

  async computeFlag(
    flag: PopulatedFlag,
    fields: FieldRecord,
    flagsByRef: Record<string, boolean | string>,
    skipHit: boolean,
  ) {
    const flagStatusOrVariant = this.resolveFlagStatus(flag, fields);

    flagsByRef[flag.key] = flagStatusOrVariant;

    if (!skipHit) {
      const queuedFlagHit: QueuedFlagHit = {
        flagId: flag.uuid,
        visitorId: String(fields?.id || ''),
        valueResolved: String(flagStatusOrVariant),
      };

      await this.queuingService.send(KafkaTopics.FlagHits, queuedFlagHit);
    }
  }

  getProjectByKeys(clientKey?: string, secretKey?: string) {
    return this.prisma.project.findFirst({
      where: {
        clientKey,
        secretKey,
      },
    });
  }

  _;

  async computeFlags(
    b64: string,
    project: Project,
    fields: FieldRecord,
    skipHit: boolean,
  ) {
    const projectEpoch = await this.cachingService.get(
      projectEpochKey(project.uuid),
    );

    if (projectEpoch) {
      const entry = await this.cachingService.get(
        sdkB64EpochToEntryKey(b64, projectEpoch),
      );

      if (entry) return JSON.parse(entry);
    }

    const flags = await this.flagService.getPopulatedFlags(project.uuid);

    const resolveFlags = {};

    const promises = flags.map((flag) =>
      this.computeFlag(flag, fields, resolveFlags, skipHit),
    );

    await Promise.all(promises);

    await this.cachingService.set(
      sdkB64EpochToEntryKey(b64, projectEpoch),
      JSON.stringify(resolveFlags),
    );

    return resolveFlags;
  }

  async generateTypescriptTypes(secretKey: string) {
    const project = await this.prisma.project.findFirst({
      where: { secretKey },
      include: {
        Flag: {
          include: {
            variants: true,
          },
        },
      },
    });

    const defaultDefinition = getStringOfTypes(project);
    const definitionWithCustomString = getStringOfTypesWithCustomStrings(
      project.Flag,
    );

    return `declare module "@progressively/types" { \n${defaultDefinition}\n\n${definitionWithCustomString}\n}`;
  }

  async getOrCreateSession(visitorId: string, projectId: string) {
    const sessionLimit = new Date();
    sessionLimit.setMinutes(sessionLimit.getMinutes() - 30);

    const session = await this.prisma.session.findFirst({
      where: {
        visitorId,
        projectUuid: projectId,
        startedAt: {
          gte: sessionLimit,
        },
      },
    });

    if (session) return session;

    return this.prisma.session.create({
      data: {
        visitorId,
        projectUuid: projectId,
      },
    });
  }

  async validateQueuedEvent(queuedEvent: QueuedEventHit) {
    if (!queuedEvent.secretKey && !queuedEvent.clientKey) {
      this.logger.error({
        error: 'Invalid secret key or client key provided',
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });

      return null;
    }

    const concernedProject = await this.getProjectByKeys(
      queuedEvent.clientKey,
      queuedEvent.secretKey,
    );

    if (!concernedProject) {
      this.logger.error({
        error: 'The client key does not match any project',
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });

      return null;
    }

    const domain = queuedEvent.domain;

    if (
      !queuedEvent.secretKey &&
      queuedEvent.clientKey &&
      (!concernedProject.domain ||
        (concernedProject.domain !== '**' &&
          !domain.includes(concernedProject.domain)))
    ) {
      this.logger.error({
        error: `The client key does not match the authorized domains. Project: "${concernedProject.domain}", received: "${domain}"`,
        level: 'error',
        context: 'Queued hit',
        payload: queuedEvent,
      });

      return null;
    }

    const session = await this.getOrCreateSession(
      queuedEvent.visitorId,
      concernedProject.uuid,
    );

    queuedEvent.sessionUuid = session.uuid;
    queuedEvent.projectUuid = concernedProject.uuid;

    return queuedEvent;
  }

  async resolveQueuedHits(queuedEvents: Array<QueuedEventHit>) {
    const promises = queuedEvents.map((queuedEvent) =>
      this.validateQueuedEvent(queuedEvent),
    );

    const validatedQueuedEvents = (await Promise.all(promises)).filter(Boolean);

    return this.eventService.bulkAddEvents(validatedQueuedEvents);
  }
}
