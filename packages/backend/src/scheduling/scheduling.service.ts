import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SchedulingCreationDTO } from './types';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  addSchedulingToFlagEnv(
    envId: string,
    flagId: string,
    scheduling: SchedulingCreationDTO,
  ): Promise<any> {
    return this.prisma.schedule.create({
      data: {
        utc: scheduling.utc,
        status: scheduling.status,
        rolloutPercentage: scheduling.rolloutPercentage,
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
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
              FlagEnvironment: {
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
}
