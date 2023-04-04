import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StrategyUpdateDto, ValueToServe } from './types';

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

  deleteStrategy(strategyId: string) {
    return this.prisma.strategy.delete({
      where: {
        uuid: strategyId,
      },
    });
  }

  async updateStrategy(strategyId: string, strategyDto: StrategyUpdateDto) {
    await this.prisma.rule.deleteMany({
      where: {
        strategyUuid: strategyId,
      },
    });

    return this.prisma.strategy.update({
      where: {
        uuid: strategyId,
      },
      data: {
        rolloutPercentage: strategyDto.rolloutPercentage,
        valueToServe: strategyDto.valueToServe,
        valueToServeType: strategyDto.valueToServeType,
        rules: { createMany: { data: strategyDto.rules } },
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
}
