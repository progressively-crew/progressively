import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { PrismaService } from '../prisma.service';
import { FlagAlreadyExists } from './errors';
import { FlagStatus } from './flags.status';

@Injectable()
export class FlagsService {
  constructor(private prisma: PrismaService) {}

  flagsByEnv(environmentId: string) {
    return this.prisma.flagEnvironment.findMany({
      where: {
        environmentId,
      },
      include: {
        flag: true,
        environment: true,
      },
    });
  }

  async hitFlag(environmentId: string, flagId: string, status: FlagStatus) {
    // Make it easier to group by date, 2 is arbitrary
    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    const hit = await this.prisma.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: environmentId,
        status,
        date,
      },
    });

    return hit;
  }

  async listFlagHits(envId: string, flagId: string) {
    const hits = await this.prisma.flagHit.groupBy({
      by: ['date'],
      _count: {
        id: true,
      },
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return hits;
  }

  async createFlag(envId: string, name: string, description: string) {
    const flagKey = camelcase(name);

    const existingFlag = await this.prisma.flagEnvironment.findFirst({
      where: {
        environmentId: envId,
        flag: {
          key: flagKey,
        },
      },
    });

    if (existingFlag) {
      throw new FlagAlreadyExists();
    }

    const flag = await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
      },
    });

    await this.prisma.flagEnvironment.create({
      data: {
        flagId: flag.uuid,
        environmentId: envId,
      },
    });

    return flag;
  }

  async deleteFlag(envId: string, flagId: string) {
    await this.prisma.flagHit.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
      },
    });

    await this.prisma.rolloutStrategy.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
      },
    });

    await this.prisma.flagEnvironment.deleteMany({
      where: {
        environmentId: envId,
        flagId: flagId,
      },
    });

    const flagDeleted = await this.prisma.flag.deleteMany({
      where: {
        uuid: flagId,
      },
    });

    return flagDeleted;
  }

  async hasPermissionOnFlag(
    flagId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: { flagEnvironment: { some: { flagId } } },
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
