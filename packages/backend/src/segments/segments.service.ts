import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SegmentsService {
  constructor(private prisma: PrismaService) {}

  listSegments(envId: string, flagId: string) {
    return this.prisma.segment.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        rule: true,
      },
    });
  }

  addSegmentToFlagEnv(envId: string, flagId: string, name: string) {
    return this.prisma.segment.create({
      data: {
        name,
        flagEnvironment: {
          connect: {
            flagId_environmentId: {
              environmentId: envId,
              flagId: flagId,
            },
          },
        },
      },
    });
  }

  getSegmentFlagEnv(segmendId: string) {
    return this.prisma.segment.findFirst({
      where: {
        uuid: segmendId,
      },
      include: {
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
          },
        },
      },
    });
  }

  deleteSegment(segmentId: string) {
    return this.prisma.segment.delete({
      where: {
        uuid: segmentId,
      },
    });
  }
}
