import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { PrismaService } from '../prisma.service';
import { FlagAlreadyExists } from './errors';
import { FlagStatus } from './flags.status';
import { FlagHitsRetrieveDTO } from './types';

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
      orderBy: {
        flag: {
          createdAt: 'desc',
        },
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
    // Nested queries in raw, not perfect but it works :(
    const hits = this.prisma.$queryRaw<Array<FlagHitsRetrieveDTO>>`
      SELECT date, (
        SELECT count(id) as activated
        FROM "FlagHit" as fh
        WHERE status = 'ACTIVATED'
        AND fh.date = rfh.date
        GROUP BY status
      ),
      (
        SELECT count(id) as notActivated
        FROM "FlagHit" as fh
        WHERE status = 'NOT_ACTIVATED'
        AND fh.date = rfh.date
        GROUP BY status
      )
      FROM "FlagHit" as rfh
      WHERE "flagEnvironmentEnvironmentId" = ${envId}
      AND "flagEnvironmentFlagId" = ${flagId}
      GROUP BY date
      ORDER BY date ASC
    `;

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
