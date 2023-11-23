import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StrategyUpdateDto, ValueToServe } from './types';
import { ComparatorEnum } from '../rule/comparators/types';
import { Strategy } from '@progressively/database';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  createStrategy(envId: string, flagId: string) {
    return this.prisma.strategy.create({
      data: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
        valueToServeType: ValueToServe.Boolean,
      },
    });
  }

  async deleteStrategy(strategyId: string) {
    const queries = [
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategyUuid: strategyId,
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          strategyUuid: strategyId,
        },
      }),
      this.prisma.strategy.delete({
        where: {
          uuid: strategyId,
        },
      }),
    ];

    const result = await this.prisma.$transaction(queries);

    return result[result.length - 1] as Strategy;
  }

  async purgeStrategyForFlagEnv(envId: string, flagId: string) {
    const deleteQueries = [];

    deleteQueries.push(
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            flagEnvironmentEnvironmentId: envId,
            flagEnvironmentFlagId: flagId,
          },
        },
      }),
    );

    deleteQueries.push(
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            flagEnvironmentEnvironmentId: envId,
            flagEnvironmentFlagId: flagId,
          },
        },
      }),
    );

    deleteQueries.push(
      this.prisma.strategy.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
          flagEnvironmentFlagId: flagId,
        },
      }),
    );

    return this.prisma.$transaction(deleteQueries);
  }

  async upsertStrategies(
    envId: string,
    flagId: string,
    strategiesDto: Array<StrategyUpdateDto>,
  ) {
    const strategies = [];
    // Delete all and re-insert
    await this.purgeStrategyForFlagEnv(envId, flagId);

    const createQueries = [];
    for (const strategyDto of strategiesDto) {
      const newStrategy = await this.prisma.strategy.create({
        data: {
          flagEnvironmentEnvironmentId: envId,
          flagEnvironmentFlagId: flagId,
          valueToServeType: strategyDto.valueToServeType,
          valueToServe: strategyDto.valueToServe,
          rolloutPercentage: strategyDto.rolloutPercentage,
        },
      });

      strategies.push(newStrategy);

      const variants = strategyDto.variants || [];
      for (const variant of variants) {
        createQueries.push(
          this.prisma.strategyVariant.create({
            data: {
              rolloutPercentage: variant.rolloutPercentage
                ? Number(variant.rolloutPercentage)
                : 0,
              variantUuid: variant.variantUuid,
              strategyUuid: newStrategy.uuid,
            },
          }),
        );
      }

      const rules = strategyDto.rules || [];
      for (const rule of rules) {
        createQueries.push(
          this.prisma.rule.create({
            data: {
              strategyUuid: newStrategy.uuid,
              fieldComparator: rule.fieldComparator,
              fieldName: rule.fieldName,
              fieldValue: rule.fieldValue,
            },
          }),
        );
      }
    }

    await this.prisma.$transaction(createQueries);

    return strategies;
  }

  async hasPermissionOnStrategy(
    strategyId: string,
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
                some: { strategies: { some: { uuid: strategyId } } },
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

  getStrategies(envId: string, flagId: string) {
    return this.prisma.strategy.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        rules: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        variants: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
