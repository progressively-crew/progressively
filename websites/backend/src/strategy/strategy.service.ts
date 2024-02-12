import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StrategyUpdateDto, ValueToServe, WhenPredicate } from './types';
import { Strategy } from '@progressively/database';
import { PopulatedStrategy } from '../flags/types';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  createStrategy(flagId: string) {
    return this.prisma.strategy.create({
      data: {
        flagUuid: flagId,
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

  async purgeStrategyForFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            flagUuid: flagId,
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            flagUuid: flagId,
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          flagUuid: flagId,
        },
      }),
    ];

    return this.prisma.$transaction(deleteQueries);
  }

  async upsertStrategies(
    flagId: string,
    strategiesDto: Array<StrategyUpdateDto>,
  ) {
    const strategies = [];
    // Delete all and re-insert
    await this.purgeStrategyForFlag(flagId);

    const createQueries = [];
    for (const strategyDto of strategiesDto) {
      const newStrategy = await this.prisma.strategy.create({
        data: {
          flagUuid: flagId,
          valueToServeType: strategyDto.valueToServeType,
          valueToServe: strategyDto.valueToServe,
          rolloutPercentage: strategyDto.rolloutPercentage,
          whenPredicate: strategyDto.whenPredicate,
          whenTimestamp: strategyDto.whenTimestamp
            ? new Date(strategyDto.whenTimestamp)
            : null,
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
          Flag: {
            some: { strategies: { some: { uuid: strategyId } } },
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

  getStrategies(flagId: string) {
    return this.prisma.strategy.findMany({
      where: {
        flagUuid: flagId,
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

  isValidStrategyDate(strategy: PopulatedStrategy) {
    if (strategy.whenPredicate === WhenPredicate.Always) {
      return true;
    }

    const now = new Date();

    if (strategy.whenPredicate === WhenPredicate.AfterThe) {
      return strategy.whenTimestamp <= now;
    }

    if (strategy.whenPredicate === WhenPredicate.BeforeThe) {
      return strategy.whenTimestamp >= now;
    }

    return false;
  }
}
