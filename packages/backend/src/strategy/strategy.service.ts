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

  async updateStrategy(strategyId: string, strategyDto: StrategyUpdateDto) {
    const queries = [];
    const variants = strategyDto?.variants || [];

    for (const variant of variants) {
      queries.push(
        this.prisma.strategyVariant.upsert({
          where: {
            strategyUuid_variantUuid: {
              strategyUuid: strategyId,
              variantUuid: variant.variantUuid,
            },
          },
          update: {
            rolloutPercentage: variant.rolloutPercentage,
            variantUuid: variant.variantUuid,
            strategyUuid: strategyId,
          },
          create: {
            rolloutPercentage: variant.rolloutPercentage,
            variantUuid: variant.variantUuid,
            strategyUuid: strategyId,
          },
        }),
      );
    }

    queries.push(
      this.prisma.strategy.update({
        where: {
          uuid: strategyId,
        },
        data: {
          rolloutPercentage: strategyDto.rolloutPercentage,
          valueToServe: strategyDto.valueToServe,
          valueToServeType: strategyDto.valueToServeType,
        },
        include: {
          variants: true,
        },
      }),
    );

    const result = await this.prisma.$transaction(queries);
    return result[result.length - 1] as Strategy;
  }

  createStrategyRule(strategyId: string) {
    return this.prisma.rule.create({
      data: {
        strategyUuid: strategyId,
        fieldComparator: ComparatorEnum.Equals,
        fieldName: '',
        fieldValue: '',
      },
    });
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
        rules: true,
        variants: true,
      },
    });
  }
}
