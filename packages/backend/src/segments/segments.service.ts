import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SegmentsService {
  constructor(private prisma: PrismaService) {}

  async listSegments(envId: string, flagId: string) {
    const x = await this.prisma.segment.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        rule: true,
      },
    });

    return x;
  }
}
