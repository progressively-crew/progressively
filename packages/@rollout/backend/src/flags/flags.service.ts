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
    const hit = await this.prisma.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: environmentId,

        status,
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
}
