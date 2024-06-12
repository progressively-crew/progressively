import { Inject, Injectable } from '@nestjs/common';
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
import { RuleService } from '../rule/rule.service';
import { IQueuingService } from '../queuing/types';
import { KafkaTopics } from '../queuing/topics';
import { FlagsService } from '../flags/flags.service';
import { Project } from '@progressively/database';
import { StrategyService } from '../strategy/strategy.service';
import { QueuedPayingHit } from '../payment/types';
import { ICachingService } from '../caching/types';
import {
  projectByIdKey,
  projectClientKeyToId,
  projectSecretKeyToId,
} from '../caching/keys';

type GetProjectByKeysArgs =
  | {
      clientKey: string;
      secretKey?: string;
    }
  | {
      clientKey?: string;
      secretKey: string;
    };

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly flagService: FlagsService,
    private readonly ruleService: RuleService,
    private readonly strategyService: StrategyService,
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

    const queuedPayingHit: QueuedPayingHit = {
      projectUuid: flag.Project.uuid,
      reduceBy: 1,
    };

    await Promise.all([
      this.queuingService.send(KafkaTopics.FlagHits, queuedFlagHit),
      this.queuingService.send(KafkaTopics.PayingHits, queuedPayingHit),
    ]);

    return {
      [flag.key]: flagStatusRecord,
    };
  }

  isInvalidDomain(
    requestOrigin?: string,
    projectDomain?: string,
    secretKey?: string,
    clientKey?: string | boolean | number,
  ) {
    const isBrowserCall = Boolean(!secretKey && clientKey);
    if (!isBrowserCall) return false;

    if (!projectDomain) {
      return true;
    }

    if (projectDomain === '**') {
      return false;
    }

    return !requestOrigin.includes(projectDomain);
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

    const queuedPayingHit: QueuedPayingHit = {
      projectUuid: flag.Project.uuid,
      reduceBy: 1,
    };

    await this.queuingService.send(KafkaTopics.PayingHits, queuedPayingHit);
  }

  async getProjectByKeys({ clientKey, secretKey }: GetProjectByKeysArgs) {
    const cachingKey = clientKey
      ? projectClientKeyToId(clientKey)
      : projectSecretKeyToId(secretKey);

    const projectId = await this.cachingService.get<string>(cachingKey);

    if (projectId) {
      const projectCachingKey = projectByIdKey(projectId);
      const project = await this.cachingService.get<Project>(projectCachingKey);

      if (project) {
        return project;
      }
    }

    const dbProject = await this.prisma.project.findFirst({
      where: {
        clientKey: clientKey ? String(clientKey) : undefined,
        secretKey,
      },
    });

    if (dbProject) {
      await Promise.all([
        this.cachingService.set(cachingKey, dbProject.uuid),
        this.cachingService.set(projectByIdKey(dbProject.uuid), dbProject),
      ]);
    }
  }

  async computeFlags(project: Project, fields: FieldRecord, skipHit: boolean) {
    const flags = await this.flagService.getPopulatedFlags(project.uuid);

    const resolveFlags = {};

    const promises = flags.map((flag) =>
      this.computeFlag(flag, fields, resolveFlags, skipHit),
    );

    await Promise.all(promises);

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
}
