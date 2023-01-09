import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { PrismaService } from '../database/prisma.service';
import { SchedulingCreationDTO, SchedulingType } from './types';
import { PopulatedFlagEnv, SchedulingStatus } from '../flags/types';
import { Schedule } from '@prisma/client';

@Injectable()
export class SchedulingService {
  constructor(
    private prisma: PrismaService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  addSchedulingToFlagEnv(
    envId: string,
    flagId: string,
    scheduling: SchedulingCreationDTO,
  ): Promise<any> {
    return this.prisma.schedule.create({
      data: {
        utc: scheduling.utc,
        status: scheduling.status,
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        type: SchedulingType.UpdatePercentage,
        data: {},
      },
    });
  }

  listScheduling(envId: string, flagId: string) {
    return this.prisma.schedule.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      orderBy: {
        utc: 'desc',
      },
    });
  }

  deleteSchedule(uuid: string) {
    return this.prisma.schedule.deleteMany({
      where: {
        uuid,
      },
    });
  }

  async hasPermissionOnSchedule(
    scheduleId: string,
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
                some: { scheduling: { some: { uuid: scheduleId } } },
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

  listAllNotRunScheduling(flagEnv: PopulatedFlagEnv) {
    const now = new Date();

    return this.prisma.schedule.findMany({
      orderBy: {
        utc: 'asc',
      },
      where: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        schedulingStatus: SchedulingStatus.NOT_RUN,
        utc: {
          lte: now,
        },
      },
    });
  }

  makeUpdateQuery(flagEnv: PopulatedFlagEnv, schedule: Schedule) {
    if (schedule.type === SchedulingType.UpdatePercentage) {
      return this.prisma.flagEnvironment.update({
        where: {
          flagId_environmentId: {
            environmentId: flagEnv.environmentId,
            flagId: flagEnv.flagId,
          },
        },
        data: {
          status: schedule.status,
        },
        include: {
          flag: true,
          strategies: true,
          scheduling: true,
          variants: true,
          eligibilities: true,
        },
      });
    }

    return undefined;
  }

  async manageFlagScheduling(
    clientKey: string,
    flagEnv: PopulatedFlagEnv,
  ): Promise<PopulatedFlagEnv> {
    let nextFlagEnv: PopulatedFlagEnv = flagEnv;

    const scheduling = await this.listAllNotRunScheduling(flagEnv);
    const updateQueries = [];

    for (const schedule of scheduling) {
      updateQueries.push(
        this.prisma.schedule.update({
          where: {
            uuid: schedule.uuid,
          },
          data: {
            schedulingStatus: SchedulingStatus.HAS_RUN,
          },
        }),
        this.makeUpdateQuery(flagEnv, schedule),
      );
    }

    const result = await this.prisma.$transaction(updateQueries);

    if (result.length > 0) {
      const rawFlagEnv = result[result.length - 1];
      nextFlagEnv = rawFlagEnv as unknown as PopulatedFlagEnv;

      this.wsGateway.notifyChanges(clientKey, nextFlagEnv);
    }

    return nextFlagEnv;
  }
}
