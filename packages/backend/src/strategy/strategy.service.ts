import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import {
  FieldRecord,
  RolloutStrategy,
  StrategyUpdateDTO,
  StrategyValueToServe,
} from './types';
import { Rule } from '../rule/Rule';
import { ComparatorEnum } from '../rule/comparators/types';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  private isValidStrategy(strategy: RolloutStrategy, fields: FieldRecord) {
    const clientFieldValue = fields[strategy.fieldName] || '';
    const strategyFieldValues = strategy.fieldValue.split('\n');

    for (const fieldValue of strategyFieldValues) {
      const rule = Rule.createFrom(fieldValue, strategy.fieldComparator);

      if (rule.isSatisfiedBy(clientFieldValue)) {
        return true;
      }
    }

    return false;
  }

  resolveAdditionalAudienceValue(
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord,
  ) {
    for (const strategy of strategies) {
      const isValidStrategyRule = this.isValidStrategy(strategy, fields);

      if (isValidStrategyRule) {
        if (strategy.valueToServeType === StrategyValueToServe.Boolean) {
          return strategy.valueToServe === 'true';
        }

        return strategy.valueToServe;
      }
    }

    return false;
  }

  addStrategyToFlagEnv(envId: string, flagId: string) {
    return this.prisma.rolloutStrategy.create({
      data: {
        flagEnvironment: {
          connect: {
            flagId_environmentId: {
              environmentId: envId,
              flagId: flagId,
            },
          },
        },
        rule: {
          create: {
            fieldName: '',
            fieldValue: '',
            fieldComparator: ComparatorEnum.Equals,
          },
        },
        valueToServe: 'false',
        valueToServeType: StrategyValueToServe.Boolean,
      },
    });
  }

  updateStrategy(uuid: string, strategy: StrategyUpdateDTO) {
    return this.prisma.rolloutStrategy.update({
      where: {
        uuid,
      },
      data: {
        rule: {
          update: {
            fieldComparator: strategy.rule.fieldComparator,
            fieldValue: strategy.rule.fieldValue,
            fieldName: strategy.rule.fieldName,
          },
        },
        valueToServeType: strategy.valueToServeType,
        valueToServe: strategy.valueToServe,
      },
      include: {
        rule: true,
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
          },
        },
      },
    });
  }

  listStrategies(envId: string, flagId: string) {
    return this.prisma.rolloutStrategy.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        rule: true,
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
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
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
        rule: true,
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
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
