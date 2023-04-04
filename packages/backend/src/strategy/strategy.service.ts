import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import {
  FieldRecord,
  RolloutStrategy,
  StrategyUpdateDTO,
  StrategyValueToServe,
} from './types';
import { ComparatorEnum } from '../rule/comparators/types';
import { RuleService } from '../rule/rule.service';

@Injectable()
export class StrategyService {
  constructor(
    private prisma: PrismaService,
    private ruleService: RuleService,
  ) {}

  resolveAdditionalAudienceValue(
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord,
  ) {
    for (const strategy of strategies) {
      const isValidStrategyRule = this.ruleService.isMatchingRule(
        strategy.rule,
        fields,
      );

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
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
