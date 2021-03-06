import { Injectable } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { FlagHitsRetrieveDTO, PopulatedFlagEnv } from './types';
import { FieldRecord } from '../strategy/types';

@Injectable()
export class FlagsService {
  constructor(
    private prisma: PrismaService,
    private strategyService: StrategyService,
  ) {}

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

  async changeFlagForEnvStatus(
    environmentId: string,
    flagId: string,
    status: FlagStatus,
  ) {
    return this.prisma.flagEnvironment.update({
      where: {
        flagId_environmentId: {
          flagId,
          environmentId,
        },
      },
      data: {
        status,
      },
      include: {
        environment: true,
        flag: true,
        strategies: true,
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
        SELECT count(id)::int as activated
        FROM "FlagHit" as fh
        WHERE status = 'ACTIVATED'
        AND fh.date = rfh.date
        GROUP BY status
      ),
      (
        SELECT count(id)::int as notActivated
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

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    let status: boolean;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      status = this.strategyService.resolveStrategies(
        flagEnv,
        flagEnv.strategies,
        fields,
      );
    } else {
      status = false;
    }

    return status;
  }

  resolveFlagStatusRecord(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    const flagStatusRecord = this.resolveFlagStatus(flagEnv, fields);

    const updatedFlag = {
      [flagEnv.flag.key]: flagStatusRecord,
    };

    return updatedFlag;
  }
}
