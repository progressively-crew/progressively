import { Injectable } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import {
  FlagHitsRetrieveDTO,
  PopulatedFlagEnv,
  SchedulingStatus,
} from './types';
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

  changeFlagForEnvStatus(
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

  adjustFlagPercentage(
    environmentId: string,
    flagId: string,
    rolloutPercentage: number,
  ) {
    return this.prisma.flagEnvironment.update({
      where: {
        flagId_environmentId: {
          flagId,
          environmentId,
        },
      },
      data: {
        rolloutPercentage,
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

    return await this.prisma.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: environmentId,
        status,
        date,
      },
    });
  }

  async listFlagHits(envId: string, flagId: string) {
    // Nested queries in raw, not perfect but it works :(
    return this.prisma.$queryRaw<Array<FlagHitsRetrieveDTO>>`
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
  }

  async deleteFlag(flagId: string) {
    await this.prisma.flagHit.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.rolloutStrategy.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.flagEnvironment.deleteMany({
      where: {
        flagId: flagId,
      },
    });

    return await this.prisma.flag.deleteMany({
      where: {
        uuid: flagId,
      },
    });
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

  async hasPermissionOnFlagEnv(
    envId: string,
    flagId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: {
              flagEnvironment: { some: { flagId, environmentId: envId } },
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

    return {
      [flagEnv.flag.key]: flagStatusRecord,
    };
  }

  async manageScheduling(flagEnv: PopulatedFlagEnv): Promise<PopulatedFlagEnv> {
    let nextFlagEnv: PopulatedFlagEnv = flagEnv;

    const now = new Date();
    const scheduling = await this.prisma.schedule.findMany({
      orderBy: {
        utc: 'asc',
      },
      where: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        schedulingStatus: SchedulingStatus.NOT_RUN,
        utc: {
          lt: now,
        },
      },
    });

    for (const schedule of scheduling) {
      await this.prisma.schedule.update({
        where: {
          uuid: schedule.uuid,
        },
        data: {
          status: SchedulingStatus.HAS_RUN,
        },
      });

      const response = await this.prisma.flagEnvironment.update({
        where: {
          flagId_environmentId: {
            environmentId: flagEnv.environmentId,
            flagId: flagEnv.flagId,
          },
        },
        data: {
          status: schedule.status,
          rolloutPercentage: schedule.rolloutPercentage,
        },
        include: {
          flag: true,
          strategies: true,
          scheduling: true,
        },
      });

      nextFlagEnv = response as unknown as PopulatedFlagEnv;
    }

    return nextFlagEnv;
  }
}
