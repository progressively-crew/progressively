import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Segment } from '@progressively/database';
import { SegmentUpsertDTO } from './types';

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

  getSegmentByIdAndProject(segmentId: string, projectId: string) {
    return this.prisma.segment.findUnique({
      where: {
        uuid: segmentId,
        projectUuid: projectId,
      },
    });
  }

  deleteSegmentRuleBySegmentId(segmentId: string) {
    return this.prisma.segmentRule.deleteMany({
      where: {
        segmentUuid: segmentId,
      },
    });
  }

  async upsertSegments(
    projectId: string,
    userId: string,
    upsertSegments: Array<SegmentUpsertDTO>,
  ) {
    const segments = [];
    for (const segmentDto of upsertSegments) {
      let segmentToUpdate = segmentDto.uuid
        ? await this.getSegmentByIdAndProject(segmentDto.uuid, projectId)
        : undefined;

      if (segmentToUpdate) {
        await Promise.all([
          this.deleteSegmentRuleBySegmentId(segmentToUpdate.uuid),
          this.prisma.segment.update({
            where: {
              uuid: segmentDto.uuid,
            },
            data: {
              name: segmentDto.name,
            },
          }),
        ]);
      } else {
        segmentToUpdate = await this.prisma.segment.create({
          data: {
            name: segmentDto.name,
            projectUuid: projectId,
            userUuid: userId,
          },
        });
      }

      segments.push(segmentToUpdate);

      await this.prisma.segmentRule.createMany({
        data: segmentDto.segmentRules.map((dto) => ({
          segmentUuid: segmentToUpdate.uuid,
          fieldName: dto.fieldName,
          fieldValue: dto.fieldValue,
          fieldComparator: dto.fieldComparator,
        })),
      });
    }

    return segments;
  }
}
