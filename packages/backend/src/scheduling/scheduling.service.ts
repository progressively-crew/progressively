import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  deleteSchedule(uuid: string) {
    return this.prisma.schedule.delete({
      where: {
        uuid,
      },
    });
  }
}
