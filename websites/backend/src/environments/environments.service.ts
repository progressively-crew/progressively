import { BadRequestException, Injectable } from '@nestjs/common';
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
    }) as unknown as Promise<PopulatedFlagEnv>;
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

  async addMetricToFlagEnv(envId: string, metricName: string) {
    const alreadyExistingMetric = await this.prisma.pMetric.findFirst({
      where: {
        name: metricName,
        environmentUuid: envId,
      },
    });

    if (alreadyExistingMetric) {
      throw new BadRequestException('This metric name is already used.');
    }

    return this.prisma.pMetric.create({
      data: {
        name: metricName,
        environmentUuid: envId,
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
          Segment: {
            flagEnvironmentEnvironmentId: envId,
          },
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
      this.prisma.pMetric.deleteMany({
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
      this.prisma.segment.deleteMany({
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

  listMetrics(envId: string) {
    return this.prisma.pMetric.findMany({
      where: {
        environmentUuid: envId,
      },
    });
  }

  async deleteMetricFlag(metricId: string) {
    return await this.prisma.pMetric.delete({
      where: {
        uuid: metricId,
      },
    });
  }

  async metricHitsCount(envId: string, startDate: string, endDate: string) {
    return this.prisma.metricHit.count({
      where: {
        metric: {
          environmentUuid: envId,
        },
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }
}
