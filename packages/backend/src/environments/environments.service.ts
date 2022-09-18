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

    const newEnv = await this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
      },
    });

    for (const flagEnv of allMatchingFlagEnv) {
      await this.prisma.flagEnvironment.create({
        data: {
          flagId: flagEnv.flagId,
          environmentId: newEnv.uuid,
          rolloutPercentage: 100,
        },
      });
    }

    return newEnv;
  }

  async createFlagEnvironment(
    envId: string,
    name: string,
    description: string,
    environments: Array<string>,
  ) {
    const flagKey = camelcase(name);

    const existingFlag = await this.prisma.flagEnvironment.findFirst({
      where: {
        environmentId: envId,
        flag: {
          key: flagKey,
        },
      },
    });

    if (existingFlag) {
      throw new FlagAlreadyExists();
    }

    const flag = await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
      },
    });

    for (const env of environments) {
      await this.prisma.flagEnvironment.create({
        data: {
          flagId: flag.uuid,
          environmentId: env,
          rolloutPercentage: 100,
        },
      });
    }

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
    const flagEnvs = await this.prisma.flagEnvironment.findMany({
      where: {
        environmentId: envId,
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

    // remove all the flagEnv from the given project
    await this.prisma.flagEnvironment.deleteMany({
      where: {
        environmentId: envId,
      },
    });

    for (const flagEnv of flagEnvs) {
      await this.prisma.flag.deleteMany({
        where: {
          uuid: flagEnv.flagId,
        },
      });
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
