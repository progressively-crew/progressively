import { Injectable } from '@nestjs/common';
import { Flag, FlagEnvironment, RolloutStrategy } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { x86 as murmur } from 'murmurhash3js';
import { ActivationRuleType, StrategyRuleType } from './types';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export interface ExtendedFlagEnv extends FlagEnvironment {
  flag: Flag;
}
@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  getBucket(flagKey: string, userId: string) {
    const bucketKey = `${userId}-${flagKey}`;
    const bucketHash: number = murmur.hash32(bucketKey, 1);
    const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
    const bucket = Math.floor(bucketHashRatio * BUCKET_COUNT);

    return bucket;
  }

  checkActivationType(
    strategy: RolloutStrategy,
    flagEnv: ExtendedFlagEnv,
    userId: string,
  ) {
    if (strategy.activationType === ActivationRuleType.Boolean) {
      return true;
    }

    if (strategy.activationType === ActivationRuleType.Percentage) {
      const bucket = this.getBucket(flagEnv.flag.key, userId);
      // Example: 10000 * (70% / 100) = 7000
      // If the bucket is 5000, it receives the variant
      const higherBoundActivationThreshold =
        BUCKET_COUNT * (strategy.rolloutPercentage / 100);

      return bucket < higherBoundActivationThreshold;
    }

    return false;
  }

  checkStrategyRule(
    strategy: RolloutStrategy,
    fields: Record<string, string | number | boolean> = {},
  ) {
    if (strategy.strategyRuleType === StrategyRuleType.Default) {
      return true;
    }

    if (strategy.strategyRuleType === StrategyRuleType.Field) {
      const splittedFieldValues = strategy.fieldValue.split('\n');

      for (const fieldValue of splittedFieldValues) {
        if (fieldValue === fields[strategy.fieldName]) {
          return true;
        }
      }
    }

    return false;
  }

  async resolveStrategies(flagEnv: ExtendedFlagEnv, userId: string) {
    const strategies = await this.prisma.rolloutStrategy.findMany({
      where: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
      },
    });

    for (const strategy of strategies) {
      const isValidStrategyRule = this.checkStrategyRule(strategy);

      // Already break when not matching the strat rule
      if (!isValidStrategyRule) return false;

      const isValidActivationType = this.checkActivationType(
        strategy,
        flagEnv,
        userId,
      );

      if (isValidActivationType) {
        return true;
      }
    }

    return false;
  }

  addStrategyToFlagEnv(
    envId: string,
    flagId: string,
    strategy: Partial<RolloutStrategy>,
  ) {
    return this.prisma.rolloutStrategy.create({
      data: {
        FlagEnvironment: {
          connect: {
            flagId_environmentId: {
              environmentId: envId,
              flagId: flagId,
            },
          },
        },
        name: strategy.name,
        strategyRuleType: strategy.strategyRuleType,
        activationType: strategy.activationType,

        // only for strategy rule type being "field"
        fieldName: strategy.fieldName,
        fieldValue: strategy.fieldValue,
        fieldComparator: strategy.fieldComparator,

        // only for activation type being "percentage"
        rolloutPercentage: strategy.rolloutPercentage,
      },
    });
  }

  listStrategies(envId: string, flagId: string) {
    return this.prisma.rolloutStrategy.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  getStrategy(stratId: string) {
    return this.prisma.rolloutStrategy.findUnique({
      where: {
        uuid: stratId,
      },
    });
  }
}
