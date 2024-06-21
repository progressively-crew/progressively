import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Segment } from '@progressively/database';

@Injectable()
export class SegmentService {
  constructor(private prisma: PrismaService) {}

  getSegments(projectId: string) {
    return this.prisma.segment.findMany({
      where: {
        projectUuid: projectId,
      },
      include: {
        segmentRules: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async hasPermissionOnStrategy(
    segmentId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          segments: {
            some: { uuid: segmentId },
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

  async deleteSegment(segmentId: string) {
    const queries = [
      this.prisma.segmentRule.deleteMany({
        where: {
          segmentUuid: segmentId,
        },
      }),
      this.prisma.segment.delete({
        where: {
          uuid: segmentId,
        },
      }),
    ];

    const result = await this.prisma.$transaction(queries);

    return result[result.length - 1] as Segment;
  }
}
