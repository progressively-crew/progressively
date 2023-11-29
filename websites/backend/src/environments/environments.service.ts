import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PopulatedFlagEnv } from '../flags/types';

@Injectable()
export class EnvironmentsService {
  constructor(private prisma: PrismaService) {}

  getProjectEnvironments(projectId: string) {
    return this.prisma.environment.findMany({
      where: {
        projectId,
      },
    });
  }

  getFlagEnvironmentByClientKey(clientKey: string) {
    return this.prisma.flagEnvironment.findMany({
      where: {
        environment: {
          clientKey,
        },
      },
      include: {
        flag: true,
        scheduling: true,
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
    }) as unknown as Promise<Array<PopulatedFlagEnv>>;
  }

  getFlagEnvironmentByClientKeyAndFlagKey(clientKey: string, flagKey: string) {
    return this.prisma.flagEnvironment.findFirst({
      where: {
        flag: {
          key: flagKey,
        },
        environment: {
          clientKey,
        },
      },
      include: {
        flag: true,
        scheduling: true,
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
    }) as unknown as Promise<PopulatedFlagEnv>;
  }

  async getBounceRate(envId: string, startDate: string, endDate: string) {
    const bounceRateData = await this.prisma.$queryRaw`
     SELECT
        COUNT(CASE WHEN numPages = 1 THEN 1 ELSE NULL END) AS SinglePageSessions,
        COUNT(*) AS TotalSessions
      FROM (
        SELECT
          "Event"."visitorId",
          COUNT(DISTINCT "Event"."url") AS numPages
        FROM
          "Event"
        WHERE "Event"."date" BETWEEN ${startDate}::timestamp AND ${endDate}::timestamp
        AND "Event"."environmentUuid"=${envId}
        AND "Event"."name"='Page View'
        GROUP BY
          "Event"."visitorId"
      ) AS SessionCounts;
    `;

    let bounceRate = 0;
    if (
      bounceRateData[0]?.singlepagesessions &&
      bounceRateData[0]?.totalsessions
    ) {
      bounceRate =
        Number(
          bounceRateData[0]?.singlepagesessions /
            bounceRateData[0]?.totalsessions,
        ) * 100;
    }

    return bounceRate;
  }

  getDistinctEventName(envId: string, startDate: string, endDate: string) {
    return this.prisma.event.findMany({
      distinct: ['name'],
      where: {
        environmentUuid: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  getUniqueVisitor(envId: string, startDate: string, endDate: string) {
    return this.prisma.event.findMany({
      distinct: ['visitorId'],
      where: {
        environmentUuid: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  getMetricCount(envId: string, startDate: string, endDate: string) {
    return this.prisma.event.count({
      where: {
        environmentUuid: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  getEventsPerDatePerGroup(
    envId: string,
    startDate: string,
    endDate: string,
    group: 'os' | 'browser' | 'url' | 'referer',
  ) {
    const notConstrains = group === 'referer' ? { NOT: { referer: null } } : {};

    return this.prisma.event.groupBy({
      by: [group],
      _count: {
        uuid: true,
      },
      where: {
        environmentUuid: envId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        ...notConstrains,
      },
      orderBy: {
        _count: {
          uuid: 'desc',
        },
      },
    });
  }

  async getEventsPerDate(envId: string, startDate: string, endDate: string) {
    const distinctEventName = await this.getDistinctEventName(
      envId,
      startDate,
      endDate,
    );

    const dictByDates = {};

    for (const dhv of distinctEventName) {
      const hitsByDate = await this.prisma.event.groupBy({
        _count: true,
        by: ['name', 'date'],
        where: {
          environmentUuid: envId,
          name: dhv.name,
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
        dictByDates[isoDate][dhv.name] = hbd._count;
      });
    }

    return Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);
  }

  async createEnvironment(projectId: string, environmentName: string) {
    const allMatchingFlagEnv = await this.prisma.flagEnvironment.findMany({
      where: {
        environment: {
          projectId,
        },
      },
      distinct: ['flagId'],
    });

    return await this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
        flagEnvironment: {
          createMany: {
            data: allMatchingFlagEnv.map((flagEnv) => ({
              flagId: flagEnv.flagId,
            })),
          },
        },
      },
    });
  }

  flagsByEnv(environmentId: string) {
    return this.prisma.flagEnvironment.findMany({
      where: {
        environmentId,
      },
      include: {
        flag: true,
        environment: true,
        variants: true,
      },
      orderBy: {
        flag: {
          createdAt: 'desc',
        },
      },
    });
  }

  async deleteEnv(envId: string) {
    const env = await this.prisma.environment.findFirst({
      where: {
        uuid: envId,
      },
      include: {
        project: {
          include: { environments: true },
        },
        flagEnvironment: true,
      },
    });

    const deleteQueries = [
      this.prisma.webhook.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.flagHit.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            flagEnvironmentEnvironmentId: envId,
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            flagEnvironmentEnvironmentId: envId,
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.event.deleteMany({
        where: {
          environmentUuid: envId,
        },
      }),
      this.prisma.variant.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.schedule.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.flagEnvironment.deleteMany({
        where: {
          environmentId: envId,
        },
      }),
    ];

    if (env.project.environments.length === 1) {
      const flagIds = env.flagEnvironment.map((flagEnv) => flagEnv.flagId);

      deleteQueries.push(
        this.prisma.flag.deleteMany({
          where: {
            uuid: {
              in: flagIds,
            },
          },
        }),
      );
    }

    deleteQueries.push(
      this.prisma.environment.deleteMany({
        where: {
          uuid: envId,
        },
      }),
    );

    const result = await this.prisma.$transaction(deleteQueries);
    return result[result.length - 1];
  }

  async hasPermissionOnEnv(
    envId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const environmentOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: {
              uuid: envId,
            },
          },
        },
      },
    });

    if (!environmentOfProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(environmentOfProject.role);
  }
}
