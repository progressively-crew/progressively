import { Injectable } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import {
  FlagHitsRetrieveDTO,
  PopulatedFlagEnv,
  SchedulingStatus,
  Variant,
} from './types';
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
    const variants = await this.prisma.variant.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });

    if (variants.length > 0) {
      const variantHits = [];
      for (const variant of variants) {
        const hits = await this.prisma.flagHit.groupBy({
          by: ['date'],
          _count: true,
          where: {
            status: variant.value,
            flagEnvironmentEnvironmentId: envId,
            flagEnvironmentFlagId: flagId,
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        });

        variantHits.push({ name: variant.value, hits });
      }

      return variantHits;
    }

    const activated = await this.prisma.flagHit.groupBy({
      by: ['date'],
      _count: true,
      where: {
        status: FlagStatus.ACTIVATED,
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const notActivated = await this.prisma.flagHit.groupBy({
      by: ['date'],
      _count: true,
      where: {
        status: FlagStatus.NOT_ACTIVATED,
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    return [
      { name: 'Activated', hits: activated },
      { name: 'Not activated', hits: notActivated },
    ];
  }

  async deleteFlag(flagId: string) {
    await this.prisma.flagHit.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.variant.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.schedule.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.rolloutStrategy.deleteMany({
      where: {
        flagEnvironmentFlagId: flagId,
      },
    });

    await this.prisma.flagEnvironment.deleteMany({
      where: {
        flagId: flagId,
      },
    });

    return this.prisma.flag.deleteMany({
      where: {
        uuid: flagId,
      },
    });
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

  async manageScheduling(flagEnv: PopulatedFlagEnv): Promise<PopulatedFlagEnv> {
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

    for (const schedule of scheduling) {
      await this.prisma.schedule.update({
        where: {
          uuid: schedule.uuid,
        },
        data: {
          status: SchedulingStatus.HAS_RUN,
        },
      });

      const response = await this.prisma.flagEnvironment.update({
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
          environment: true,
        },
      });

      nextFlagEnv = response as unknown as PopulatedFlagEnv;

      this.wsGateway.notifyChanges(
        nextFlagEnv.environment.clientKey,
        nextFlagEnv,
      );
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
    let count: number = 0;
    for (const variant of variants) {
      await this.prisma.variant.updateMany({
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
      });

      count++;
    }

    return { count };
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
}
