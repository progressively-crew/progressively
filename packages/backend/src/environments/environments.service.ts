import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { PrismaService } from '../database/prisma.service';
import { FlagAlreadyExists } from './errors';

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
        Segment: {
          include: {
            rule: true,
          },
        },
        variants: {
          orderBy: {
            rolloutPercentage: 'asc',
          },
        },
      },
    });
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

    const flagsToCreate = allMatchingFlagEnv.map((flagEnv) => ({
      rolloutPercentage: 100,
      flagId: flagEnv.flagId,
    }));

    return await this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
        flagEnvironment: {
          createMany: { data: flagsToCreate },
        },
      },
    });
  }

  async createFlagEnvironment(
    envId: string,
    name: string,
    description: string,
  ) {
    const flagKey = camelcase(name);

    const existingFlagEnv = await this.prisma.flagEnvironment.findFirst({
      where: {
        environmentId: envId,
        flag: {
          key: flagKey,
        },
      },
    });

    if (existingFlagEnv) {
      throw new FlagAlreadyExists();
    }

    const concernedEnv = await this.prisma.environment.findFirst({
      where: {
        uuid: envId,
      },
    });

    const envsOfProject = await this.prisma.environment.findMany({
      where: {
        projectId: concernedEnv.projectId,
      },
    });

    const flagsEnvs = envsOfProject.map((env) => ({
      environmentId: env.uuid,
      rolloutPercentage: 100,
    }));

    return await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
        flagEnvironment: {
          createMany: { data: flagsEnvs },
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
      this.prisma.pMetricHit.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
        },
      }),
      this.prisma.pMetric.deleteMany({
        where: {
          flagEnvironmentEnvironmentId: envId,
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
}
