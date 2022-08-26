import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import {
  ComparatorEnum,
  FieldRecord,
  RolloutStrategy,
  StrategyRuleType,
} from './types';
import { ComparatorFactory } from './comparators/comparatorFactory';
import { isInBucket } from './utils';
import { StrategyCreationDTO } from './strategy.dto';
import { Flag, FlagEnvironment } from '../flags/types';

export interface ExtendedFlagEnv extends FlagEnvironment {
  flag: Flag;
}
@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  private _checkActivationType(
    strategy: RolloutStrategy,
    flagEnv: ExtendedFlagEnv,
    fields: FieldRecord,
  ) {
    // Return the flag to everyone, even people with no ID fields when the percentage is 100%
    if (flagEnv.rolloutPercentage === 100) return true;

    // Early break when the field is is not defined, except when the rollout is 100%
    if (!fields?.id) return false;

    return isInBucket(
      flagEnv.flag.key,
      fields.id as string,
      flagEnv.rolloutPercentage,
    );
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

  resolveStrategies(
    flagEnv: ExtendedFlagEnv,
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord,
  ) {
    // Always return true when no strategies are passed
    if (strategies.length === 0) return true;

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

  listScheduling(envId: string, flagId: string) {
    return this.prisma.schedule.findMany({
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
