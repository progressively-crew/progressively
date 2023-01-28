import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Activity } from './types';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  register(activity: Activity) {
    return this.prisma.activityLog.create({
      data: {
        concernedEntity: activity.concernedEntity,
        type: activity.type,
        userUuid: activity.userId,
        flagEnvironmentFlagId: activity.flagId,
        flagEnvironmentEnvironmentId: activity.envId,
        data: activity.data,
      },
    });
  }
}
