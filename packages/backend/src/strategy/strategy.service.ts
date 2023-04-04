import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  createStrategy(envId: string, flagId: string) {
    return this.prisma.strategy.create({
      data: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
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
