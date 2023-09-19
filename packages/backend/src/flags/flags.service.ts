import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { Variant } from './types';
import { VariantCreationDTO } from './flags.dto';
import camelcase from 'camelcase';
import { FlagAlreadyExists } from '../projects/errors';
import { EventTypes } from '../events/types';

@Injectable()
export class FlagsService {
  constructor(private prisma: PrismaService) {}

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
        variants: true,
        webhooks: true,
        strategies: {
          include: {
            rules: {
              include: {
                Segment: {
                  include: {
                    rule: true,
                  },
                },
              },
            },
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
      include: {
        flagEnvironment: {
          include: {
            environment: true,
          },
        },
      },
    });
  }

  hitFlag(
    environmentId: string,
    flagId: string,
    visitorId: string,
    valueResolved: string,
  ) {
    // Make it easier to group by date, 2 is arbitrary
    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.event.create({
      data: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: environmentId,
        data: valueResolved,
        date,
        visitorId,
        type: EventTypes.Evaluation,
      },
    });
  }

  async flagEvaluationsCount(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.event.count({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        type: EventTypes.Evaluation,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async flagEvaluations(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    return this.prisma.event.groupBy({
      by: ['data'],
      _count: true,
      where: {
        type: EventTypes.Evaluation,
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  getDistinctEvents(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
    eventType: EventTypes,
  ) {
    return this.prisma.event.findMany({
      distinct: eventType === EventTypes.Metric ? ['pMetricUuid'] : ['data'],
      where: {
        type: eventType,
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        metric: eventType === EventTypes.Metric,
      },
    });
  }

  async flagHitsPerVariantPerDate(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const disctintHitValue = await this.getDistinctEvents(
      envId,
      flagId,
      startDate,
      endDate,
      EventTypes.Evaluation,
    );

    const dictByDates = {};

    for (const dhv of disctintHitValue) {
      const hitsByDate = await this.prisma.event.groupBy({
        _count: true,
        by: ['date'],
        where: {
          type: EventTypes.Evaluation,
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          data: dhv.data,
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
        dictByDates[isoDate][dhv.data] = hbd._count;
      });
    }

    return Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);
  }

  async metricHitsPerDate(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const eventsOnMetrics = await this.getDistinctEvents(
      envId,
      flagId,
      startDate,
      endDate,
      EventTypes.Metric,
    );

    const dictByDates = {};

    for (const eom of eventsOnMetrics) {
      const hitsByDate = await this.prisma.event.groupBy({
        _count: true,
        by: ['date'],
        where: {
          type: EventTypes.Metric,
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          pMetricUuid: eom.pMetricUuid,
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
        dictByDates[isoDate][eom.metric.name] = hbd._count;
      });
    }

    return Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);
  }

  async deleteFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.webhook.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.event.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          Segment: {
            flagEnvironmentFlagId: flagId,
          },
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            flagEnvironmentFlagId: flagId,
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            flagEnvironmentFlagId: flagId,
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.segment.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.variant.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.schedule.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.flagEnvironment.deleteMany({
        where: {
          flagId: flagId,
        },
      }),
      this.prisma.flag.deleteMany({
        where: {
          uuid: flagId,
        },
      }),
    ];

    const [, , , , , flagRemoved] = await this.prisma.$transaction(
      deleteQueries,
    );

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

  listVariants(envId: string, flagId: string) {
    return this.prisma.variant.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  listActivity(envId: string, flagId: string) {
    return this.prisma.activityLog.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
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

  async createVariant(
    envId: string,
    flagId: string,
    variant: VariantCreationDTO,
  ) {
    const variantsOfFlags = await this.prisma.variant.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });

    const isFirstVariantCreatedThusControl = variantsOfFlags.length === 0;

    return this.prisma.variant.create({
      data: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
        isControl: isFirstVariantCreatedThusControl,
        value: variant.value,
      },
    });
  }

  async editVariants(envId: string, flagId: string, variants: Array<Variant>) {
    const updateQueries = variants.map((variant) =>
      this.prisma.variant.updateMany({
        where: {
          uuid: variant.uuid,
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
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

    const existingFlagEnv = await this.prisma.flagEnvironment.findFirst({
      where: {
        environment: {
          projectId,
        },
        flag: {
          key: flagKey,
        },
      },
    });

    if (existingFlagEnv) {
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
