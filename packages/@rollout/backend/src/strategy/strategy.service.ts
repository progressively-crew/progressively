import { Injectable } from '@nestjs/common';
import { Flag, FlagEnvironment, RolloutStrategy } from '@prisma/client';
import { x86 as murmur } from 'murmurhash3js';
import { PrismaService } from '../prisma.service';
import {
  ActivationRuleType,
  ComparatorEnum,
  FieldRecord,
  StrategyRuleType,
} from './types';
import { ComparatorFactory } from './comparators/comparatorFactory';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export interface ExtendedFlagEnv extends FlagEnvironment {
  flag: Flag;
}
@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  private _generateBucket(flagKey: string, userId: string) {
    const bucketKey = `${userId}-${flagKey}`;
    const bucketHash: number = murmur.hash32(bucketKey, 1);
    const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
    const bucket = Math.floor(bucketHashRatio * BUCKET_COUNT);

    return bucket;
  }

  private _checkActivationType(
    strategy: RolloutStrategy,
    flagEnv: ExtendedFlagEnv,
    fields: FieldRecord,
  ) {
    if (strategy.activationType === ActivationRuleType.Boolean) {
      return true;
    }

    if (strategy.activationType === ActivationRuleType.Percentage) {
      // Return the flag to everyone, even people with no ID fields when the percentage is 100%
      if (strategy.rolloutPercentage === 100) return true;

      // Early break when the field is is not defined, except when the rollout is 100%
      if (!fields?.id) return false;

      const bucket = this._generateBucket(
        flagEnv.flag.key,
        fields.id as string,
      );

      // Example: 10000 * (70% / 100) = 7000
      // If the bucket is 5000, it receives the variant
      const higherBoundActivationThreshold =
        BUCKET_COUNT * (strategy.rolloutPercentage / 100);

      return bucket < higherBoundActivationThreshold;
    }

    return false;
  }

  private _checkStrategyRule(strategy: RolloutStrategy, fields: FieldRecord) {
    if (strategy.strategyRuleType === StrategyRuleType.Default) {
      return true;
    }

    if (strategy.strategyRuleType === StrategyRuleType.Field) {
      const fieldComparator = strategy.fieldComparator as ComparatorEnum;
      const isValid = ComparatorFactory.create(fieldComparator);

      const strategyFieldValues = strategy.fieldValue.split('\n');

      for (const fieldValue of strategyFieldValues) {
        const clientFieldValue = fields[strategy.fieldName];

        if (isValid(fieldValue, clientFieldValue)) {
          return true;
        }
      }
    }

    return false;
  }

  async resolveStrategies(
    flagEnv: ExtendedFlagEnv,
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord = {},
  ) {
    for (const strategy of strategies) {
      const isValidStrategyRule = this._checkStrategyRule(strategy, fields);

      // Already break when not matching the strat rule
      if (!isValidStrategyRule) return false;

      const isValidActivationType = this._checkActivationType(
        strategy,
        flagEnv,
        fields,
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

  deleteStrategy(stratId: string) {
    return this.prisma.rolloutStrategy.delete({
      where: {
        uuid: stratId,
      },
    });
  }
}
