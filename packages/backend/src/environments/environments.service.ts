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

  async getFlagEnvironmentByClientKey(clientKey: string) {
    return await this.prisma.flagEnvironment.findMany({
      where: {
        environment: {
          clientKey,
        },
      },
      include: {
        flag: true,
        strategies: true,
        scheduling: true,
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

    const newEnv = await this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
        flagEnvironment: {
          createMany: { data: flagsToCreate },
        },
      },
    });

    return newEnv;
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

    const flag = await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
        flagEnvironment: {
          createMany: { data: flagsEnvs },
        },
      },
    });

    return flag;
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

    await this.prisma.flagHit.deleteMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
      },
    });

    await this.prisma.variant.deleteMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
      },
    });

    await this.prisma.schedule.deleteMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
      },
    });

    // remove all the flagEnv from the given project
    await this.prisma.flagEnvironment.deleteMany({
      where: {
        environmentId: envId,
      },
    });

    // If this is the last environment available in the project env list,
    // remove the flag from the database since they won't have any link
    // to any environments anymore
    if (env.project.environments.length === 1) {
      for (const flagEnv of env.flagEnvironment) {
        await this.prisma.flag.deleteMany({
          where: {
            uuid: flagEnv.flagId,
          },
        });
      }
    }

    return this.prisma.environment.delete({
      where: {
        uuid: envId,
      },
    });
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
