import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { PopulatedFlag, QueuedFlagHit, Variant } from './types';
import { VariantCreationDTO } from './flags.dto';
import camelcase from 'camelcase';
import { FlagAlreadyExists } from '../projects/errors';

@Injectable()
export class FlagsService {
  constructor(private prisma: PrismaService) {}

  getPopulatedFlags(projectId: string) {
    return this.prisma.flag.findMany({
      where: {
        projectUuid: projectId,
      },
      include: {
        strategies: {
          include: {
            rules: true,
            variants: {
              include: {
                variant: true,
              },
              orderBy: {
                rolloutPercentage: 'asc',
              },
            },
          },
        },
      },
    }) as unknown as Promise<Array<PopulatedFlag>>;
  }

  changeFlagStatus(flagId: string, status: FlagStatus) {
    return this.prisma.flag.update({
      where: {
        uuid: flagId,
      },
      data: {
        status,
      },
      include: {
        variants: true,
        webhooks: true,
        strategies: {
          include: {
            rules: true,
            variants: {
              include: {
                variant: true,
              },
              orderBy: {
                rolloutPercentage: 'asc',
              },
            },
          },
        },
      },
    });
  }

  getFlagById(flagId: string) {
    return this.prisma.flag.findUnique({
      where: { uuid: flagId },
    });
  }

  hitFlag(queuedFlagHit: QueuedFlagHit) {
    // Make it easier to group by date, 2 is arbitrary
    const date = new Date();

    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.flagHit.create({
      data: {
        flagUuid: queuedFlagHit.flagId,
        valueResolved: queuedFlagHit.valueResolved,
        date,
        visitorId: queuedFlagHit.visitorId,
      },
    });
  }

  async flagEvaluations(flagId: string, startDate: string, endDate: string) {
    return this.prisma.flagHit.groupBy({
      by: ['valueResolved'],
      _count: true,
      where: {
        flagUuid: flagId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async flagEvaluationsOverTime(
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const distinctFlagHitValues = await this.getDistinctFlagHitValues(
      flagId,
      startDate,
      endDate,
    );

    const dictByDates = {};

    for (const dhv of distinctFlagHitValues) {
      const hitsByDate = await this.prisma.flagHit.groupBy({
        _count: true,
        by: ['valueResolved', 'date'],
        where: {
          valueResolved: dhv.valueResolved,
          flagUuid: flagId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      hitsByDate.forEach((hbd) => {
        const isoDate = hbd.date.toISOString();

        if (!dictByDates[isoDate]) {
          dictByDates[isoDate] = {};
        }

        dictByDates[isoDate]['date'] = isoDate;
        dictByDates[isoDate][dhv.valueResolved] = hbd._count;
      });
    }

    return Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);
  }

  getDistinctFlagHitValues(flagId: string, startDate: string, endDate: string) {
    return this.prisma.flagHit.findMany({
      distinct: ['valueResolved'],
      where: {
        flagUuid: flagId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async deleteFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.webhook.deleteMany({
        where: {
          flagUuid: flagId,
        },
      }),
      this.prisma.flagHit.deleteMany({
        where: {
          flagUuid: flagId,
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            flagUuid: flagId,
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            flagUuid: flagId,
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          flagUuid: flagId,
        },
      }),
      this.prisma.variant.deleteMany({
        where: {
          flagUuid: flagId,
        },
      }),
      this.prisma.flag.deleteMany({
        where: {
          uuid: flagId,
        },
      }),
    ];

    const [, , , , , flagRemoved] =
      await this.prisma.$transaction(deleteQueries);

    return flagRemoved;
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
          Flag: {
            some: { uuid: flagId },
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

  listVariants(flagId: string) {
    return this.prisma.variant.findMany({
      where: {
        flagUuid: flagId,
      },
    });
  }

  listActivity(flagId: string) {
    return this.prisma.activityLog.findMany({
      where: {
        flagUuid: flagId,
      },
      include: {
        user: {
          select: {
            fullname: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      take: 50,
    });
  }

  async createVariant(flagId: string, variant: VariantCreationDTO) {
    const variantsOfFlags = await this.prisma.variant.findMany({
      where: {
        flagUuid: flagId,
      },
    });

    const isFirstVariantCreatedThusControl = variantsOfFlags.length === 0;

    return this.prisma.variant.create({
      data: {
        flagUuid: flagId,
        isControl: isFirstVariantCreatedThusControl,
        value: variant.value,
      },
    });
  }

  async editVariants(flagId: string, variants: Array<Variant>) {
    const updateQueries = variants.map((variant) =>
      this.prisma.variant.updateMany({
        where: {
          uuid: variant.uuid,
          flagUuid: flagId,
        },
        data: {
          isControl: Boolean(variant.isControl),
          value: variant.value,
        },
      }),
    );

    const result = await this.prisma.$transaction(updateQueries);

    return { count: result.length };
  }

  async deleteVariantFlag(variantId: string) {
    const deleteQueries = [
      this.prisma.strategyVariant.deleteMany({
        where: {
          variantUuid: variantId,
        },
      }),
      this.prisma.variant.delete({
        where: {
          uuid: variantId,
        },
      }),
    ];

    const result = await this.prisma.$transaction(deleteQueries);

    return result[result.length - 1];
  }

  async editFlag(
    projectId: string,
    flagId: string,
    name: string,
    description: string,
  ) {
    const flagKey = camelcase(name);

    const exisitingFlag = await this.prisma.flag.findFirst({
      where: {
        projectUuid: projectId,
        key: flagKey,
      },
    });

    if (exisitingFlag) {
      throw new FlagAlreadyExists();
    }

    return await this.prisma.flag.update({
      where: {
        uuid: flagId,
      },
      data: {
        name,
        description,
        key: flagKey,
      },
    });
  }
}
