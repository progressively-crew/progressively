import { Injectable } from '@nestjs/common';
import { ComparatorFactory } from '../shared/utils/comparators/comparatorFactory';
import { ComparatorEnum } from '../shared/utils/comparators/types';
import { PrismaService } from '../database/prisma.service';

import { StrategyCreationDTO } from './strategy.dto';
import { FieldRecord, RolloutStrategy } from './types';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  private isValidStrategy(strategy: RolloutStrategy, fields: FieldRecord) {
    const fieldComparator = strategy.fieldComparator as ComparatorEnum;
    const isValid = ComparatorFactory.create(fieldComparator);

    const strategyFieldValues = strategy.fieldValue.split('\n');

    for (const fieldValue of strategyFieldValues) {
      const clientFieldValue = fields[strategy.fieldName] || '';

      if (isValid(fieldValue, clientFieldValue)) {
        return true;
      }
    }

    return false;
  }

  isAdditionalAudience(
    strategies: Array<RolloutStrategy>,
    fields: FieldRecord,
  ) {
    for (const strategy of strategies) {
      const isValidStrategyRule = this.isValidStrategy(strategy, fields);

      if (isValidStrategyRule) return true;
    }

    return false;
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
        fieldName: strategy.fieldName,
        fieldValue: strategy.fieldValue,
        fieldComparator: strategy.fieldComparator,
        valueToServe: strategy.valueToServe,
        valueToServeType: strategy.valueToServeType,
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
        FlagEnvironment: {
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
