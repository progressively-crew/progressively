import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from './flags.status';
import { PopulatedFlag, QueuedFlagHit, Variant } from './types';
import { VariantCreationDTO } from './flags.dto';
import camelcase from 'camelcase';
import { FlagAlreadyExists } from '../projects/errors';
import { ClickHouseClient } from '@progressively/database';
import { Timeframe } from '../events/types';
import { ICachingService } from '../caching/types';
import { projectEpochKey } from '../caching/keys';

@Injectable()
export class FlagsService {
  constructor(
    private prisma: PrismaService,
    @Inject('ClickhouseService') private readonly clickhouse: ClickHouseClient,
    @Inject('CachingService') private readonly cachingService: ICachingService,
  ) {}

  getPopulatedFlags(projectId: string) {
    return this.prisma.flag.findMany({
      where: {
        projectUuid: projectId,
      },
      include: {
        Project: true,
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

  // Invalidate the cache for the feature flag resolution
  changeEpoch(projectId: string) {
    return this.cachingService.set(
      projectEpochKey(projectId),
      Date.now().toString(),
    );
  }

  async changeFlagStatus(flagId: string, status: FlagStatus) {
    const updatedFlag = await this.prisma.flag.update({
      where: {
        uuid: flagId,
      },
      data: {
        status,
      },
      include: {
        Project: true,
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

    await this.changeEpoch(updatedFlag.projectUuid);

    return updatedFlag;
  }

  getFlagById(flagId: string) {
    return this.prisma.flag.findUnique({
      where: { uuid: flagId },
    });
  }

  hitFlag(queuedFlagHit: QueuedFlagHit) {
    const date = new Date();

    const flagHit = {
      date,
      visitorId: queuedFlagHit.visitorId,
      valueResolved: queuedFlagHit.valueResolved,
      flagUuid: queuedFlagHit.flagId,
    };

    return this.clickhouse.insert({
      table: 'flaghits',
      values: [flagHit],
      format: 'JSONEachRow',
      clickhouse_settings: {
        // Allows to insert serialized JS Dates (such as '2023-12-06T10:54:48.000Z')
        date_time_input_format: 'best_effort',
      },
    });
  }

  async flagEvaluations(flagId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT
      valueResolved,
      CAST(COUNT(*) AS Int32) AS count
  FROM
      flaghits
  WHERE
      flagUuid = '${flagId}' AND
      toDate(date) >= now() - INTERVAL ${timeframe} DAY
  GROUP BY
      valueResolved`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      valueResolved: string;
      count: number;
    }> = await resultSet.json();

    return dataset;
  }

  async getFlagEvaluationsGroupedByDate(flagId: string, timeframe: Timeframe) {
    const resultSet = await this.clickhouse.query({
      query: `SELECT
          toDate(date) AS date,
          valueResolved,
          CAST(COUNT(*) AS Int32) AS count
      FROM
          flaghits
      WHERE
          flagUuid = '${flagId}' AND
          date >= now() - INTERVAL ${timeframe} DAY
      GROUP BY
          date,
          valueResolved
      ORDER BY
          valueResolved ASC,
          date ASC`,
      format: 'JSONEachRow',
    });

    const dataset: Array<{
      valueResolved: string;
      date: string;
      count: number;
    }> = await resultSet.json();

    return dataset;
  }

  async deleteFlagHitsOfProject(projectId: string) {
    return await this.clickhouse.exec({
      query: `DELETE FROM flaghits WHERE flagUuid = '${projectId}'`,
    });
  }

  async deleteFlagHitsOfFlag(flagUuid: string) {
    return await this.clickhouse.exec({
      query: `DELETE FROM flaghits WHERE flagUuid = '${flagUuid}'`,
    });
  }

  async deleteFlag(flagId: string) {
    const deleteQueries = [
      this.prisma.webhook.deleteMany({
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

    await this.deleteFlagHitsOfFlag(flagId);

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
      take: 30,
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
        uuid: {
          not: {
            equals: flagId,
          },
        },
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
