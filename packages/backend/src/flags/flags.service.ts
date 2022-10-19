import { BadRequestException, Injectable } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { PopulatedFlagEnv, SchedulingStatus, Variant } from './types';
import { FieldRecord } from '../strategy/types';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { VariantCreationDTO } from './flags.dto';

@Injectable()
export class FlagsService {
  constructor(
    private prisma: PrismaService,
    private strategyService: StrategyService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  flagsByEnv(environmentId: string) {
    return this.prisma.flagEnvironment.findMany({
      where: {
        environmentId,
      },
      include: {
        flag: true,
        environment: true,
      },
      orderBy: {
        flag: {
          createdAt: 'desc',
        },
      },
    });
  }

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

  hitFlag(environmentId: string, flagId: string, statusOrVariant: string) {
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
        status: statusOrVariant,
        date,
      },
    });
  }

  async listFlagHits(
    envId: string,
    flagId: string,
    startDate: string,
    endDate: string,
  ) {
    const distincMetrics = await this.prisma.pMetricHit.findMany({
      distinct: 'pMetricUuid',
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
      include: {
        metric: {
          include: {
            variant: true,
          },
        },
      },
    });

    const hits = [];
    for (const pMetricHit of distincMetrics) {
      const metricHits = await this.prisma.pMetricHit.groupBy({
        by: ['date'],
        _count: true,
        where: {
          pMetricUuid: pMetricHit.pMetricUuid,
          flagEnvironmentFlagId: flagId,
          flagEnvironmentEnvironmentId: envId,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      });

      hits.push({
        name: pMetricHit.metric.name,
        hits: metricHits,
        variant: pMetricHit.metric.variant?.value,
      });
    }

    return hits;
  }

  async deleteFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.flagHit.deleteMany({
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

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    let status: boolean | string;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      status = this.strategyService.resolveStrategies(
        flagEnv,
        flagEnv.strategies,
        fields,
      );
    } else {
      status = false;
    }

    return status;
  }

  resolveFlagStatusRecord(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    const flagStatusRecord = this.resolveFlagStatus(flagEnv, fields);

    return {
      [flagEnv.flag.key]: flagStatusRecord,
    };
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
          lt: now,
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
            status: SchedulingStatus.HAS_RUN,
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
          },
        }),
      );
    }

    const result = await this.prisma.$transaction(updateQueries);

    if (result.length > 0) {
      const rawFlagEnv = result[result.length - 1];
      nextFlagEnv = rawFlagEnv as unknown as PopulatedFlagEnv;
    }

    this.wsGateway.notifyChanges(clientKey, nextFlagEnv);

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
