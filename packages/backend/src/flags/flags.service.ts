import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { PopulatedFlagEnv, SchedulingStatus, Variant } from './types';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { VariantCreationDTO } from './flags.dto';

@Injectable()
export class FlagsService {
  constructor(
    private prisma: PrismaService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

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
        strategies: true,
        variants: true,
        webhooks: true,
        eligibilities: true,
      },
    });
  }

  adjustFlagPercentage(
    environmentId: string,
    flagId: string,
    rolloutPercentage: number,
  ) {
    return this.prisma.flagEnvironment.update({
      where: {
        flagId_environmentId: {
          flagId,
          environmentId,
        },
      },
      data: {
        rolloutPercentage,
      },
      include: {
        environment: true,
        flag: true,
        strategies: true,
        variants: true,
        eligibilities: true,
      },
    });
  }

  async addMetricToFlagEnv(
    envId: string,
    flagId: string,
    metricName: string,
    variantId?: string,
  ) {
    const alreadyExistingMetric = await this.prisma.pMetric.findFirst({
      where: {
        name: metricName,
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });

    if (alreadyExistingMetric) {
      throw new BadRequestException('This metric name is already used.');
    }

    return this.prisma.pMetric.create({
      data: {
        name: metricName,
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
        variantUuid: variantId,
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

    return this.prisma.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: environmentId,
        valueResolved,
        date,
        visitorId,
      },
    });
  }

  async flagEvaluationsCount(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.flagHit.count({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async metricsByVariantCount(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const metrics = await this.prisma.pMetric.findMany({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
      },
      include: {
        variant: true,
      },
    });

    const metricsHit = [];

    for (const metric of metrics) {
      const count = await this.prisma.pMetricHit.count({
        where: {
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          pMetricUuid: metric.uuid,
        },
      });

      metricsHit.push({
        metric: metric.name,
        variant: metric.variant?.value,
        count,
      });
    }

    return metricsHit;
  }

  async flagEvaluations(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    return this.prisma.flagHit.groupBy({
      by: ['valueResolved'],
      _count: true,
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async flagHitsPerVariantPerDate(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const disctintHitValue = await this.prisma.flagHit.findMany({
      distinct: ['valueResolved'],
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const dictByDates = {};

    for (const dhv of disctintHitValue) {
      const hitsByDate = await this.prisma.flagHit.groupBy({
        _count: true,
        by: ['date'],
        where: {
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          valueResolved: dhv.valueResolved,
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

    const hitsPerDates = Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);

    return hitsPerDates;
  }

  async deleteFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.webhook.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.flagHit.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.pMetricHit.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.pMetric.deleteMany({
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
      this.prisma.rolloutStrategy.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
        },
      }),
      this.prisma.eligibility.deleteMany({
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

  async manageScheduling(
    clientKey: string,
    flagEnv: PopulatedFlagEnv,
  ): Promise<PopulatedFlagEnv> {
    let nextFlagEnv: PopulatedFlagEnv = flagEnv;

    const now = new Date();
    const scheduling = await this.prisma.schedule.findMany({
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
        this.prisma.flagEnvironment.update({
          where: {
            flagId_environmentId: {
              environmentId: flagEnv.environmentId,
              flagId: flagEnv.flagId,
            },
          },
          data: {
            status: schedule.status,
            rolloutPercentage: schedule.rolloutPercentage,
          },
          include: {
            flag: true,
            strategies: true,
            scheduling: true,
            variants: true,
            eligibilities: true,
          },
        }),
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

  listVariants(envId: string, flagId: string) {
    return this.prisma.variant.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  listMetrics(envId: string, flagId: string) {
    return this.prisma.pMetric.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        variant: true,
      },
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
        rolloutPercentage: variant.rolloutPercentage,
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
          rolloutPercentage: variant.rolloutPercentage,
          value: variant.value,
        },
      }),
    );

    const result = await this.prisma.$transaction(updateQueries);

    return { count: result.length };
  }

  deleteVariantFlag(envId: string, flagId: string, variantId: string) {
    return this.prisma.variant.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
        flagEnvironmentEnvironmentId: envId,
        uuid: variantId,
      },
    });
  }

  async deleteMetricFlag(envId: string, flagId: string, metricId: string) {
    const deleteQueries = [
      this.prisma.pMetricHit.deleteMany({
        where: {
          pMetricUuid: metricId,
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.pMetric.deleteMany({
        where: {
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          uuid: metricId,
        },
      }),
    ];

    const [, deletedMetric] = await this.prisma.$transaction(deleteQueries);

    return deletedMetric;
  }
}
