import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { Flag, FlagEnvironment, Variant } from '../flags/types';
import { ComparatorFactory } from './comparators/comparatorFactory';
import { StrategyCreationDTO } from './strategy.dto';
import {
  ComparatorEnum,
  FieldRecord,
  RolloutStrategy,
  StrategyRuleType,
} from './types';
import { genBucket, getVariation, isInBucket } from './utils';

export interface ExtendedFlagEnv extends FlagEnvironment {
  flag: Flag;
}
@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  private resolveFlagVariantValue(
    flagEnv: ExtendedFlagEnv,
    fields: FieldRecord,
  ): boolean | Variant {
    const bucketId = genBucket(flagEnv.flag.key, fields.id as string);
    const isMultiVariate = flagEnv.variants.length > 0;

    if (isMultiVariate) {
      return getVariation(bucketId, flagEnv.variants);
    }

    return isInBucket(bucketId, flagEnv.rolloutPercentage);
  }

  private isValidStrategy(strategy: RolloutStrategy, fields: FieldRecord) {
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

  resolveStrategies(
    flagEnv: ExtendedFlagEnv,
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord,
  ) {
    // When at least one variant is created, we cant rely on rolloutPercentage at the flag level
    // we need to rely on the percentage at the variant level
    if (flagEnv.variants?.length === 0 && flagEnv.rolloutPercentage === 100) {
      return true;
    }

    // No users, we can't make assumptions, should be very rare
    if (!fields?.id) return false;

    const variant = this.resolveFlagVariantValue(flagEnv, fields);

    if (Boolean(variant)) {
      return variant;
    }

    for (const strategy of strategies) {
      const isValidStrategyRule = this.isValidStrategy(strategy, fields);

      if (isValidStrategyRule) return true;
    }

    return false;
  }

  editStrategy(stratId: string, strategy: StrategyCreationDTO) {
    return this.prisma.rolloutStrategy.update({
      data: strategy,
      where: {
        uuid: stratId,
      },
    });
  }

  addStrategyToFlagEnv(
    envId: string,
    flagId: string,
    strategy: Partial<StrategyCreationDTO>,
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

        // only for strategy rule type being "field"
        fieldName: strategy.fieldName,
        fieldValue: strategy.fieldValue,
        fieldComparator: strategy.fieldComparator,
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

  getStrategyFlagEnv(stratId: string) {
    return this.prisma.rolloutStrategy.findFirst({
      where: {
        uuid: stratId,
      },
      include: {
        FlagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
          },
        },
      },
    });
  }

  deleteStrategy(stratId: string) {
    return this.prisma.rolloutStrategy.delete({
      where: {
        uuid: stratId,
      },
      include: {
        FlagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
          },
        },
      },
    });
  }

  async hasPermissionOnStrategy(
    stratId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: {
              flagEnvironment: {
                some: { strategies: { some: { uuid: stratId } } },
              },
            },
          },
        },
      },
    });

    if (!flagOfProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(flagOfProject.role);
  }
}
