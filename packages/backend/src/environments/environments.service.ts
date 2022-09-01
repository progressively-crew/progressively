import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { VariantType } from '../flags/types';
import { PrismaService } from '../database/prisma.service';
import { FlagAlreadyExists } from './errors';
import { VariantCreationDTO } from 'src/flags/flags.dto';

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

  createEnvironment(projectId: string, environmentName: string) {
    return this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
      },
    });
  }

  async createFlagEnvironment(
    envId: string,
    name: string,
    description: string,
    environments: Array<string>,
    variantType: VariantType,
    variants: Array<VariantCreationDTO>,
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
      const flagEnv = await this.prisma.flagEnvironment.create({
        data: {
          flagId: flag.uuid,
          environmentId: env,
          rolloutPercentage: 100,
          variantType,
        },
      });

      for (const variant of variants) {
        await this.prisma.variant.create({
          data: {
            flagEnvironmentFlagId: flagEnv.flagId,
            flagEnvironmentEnvironmentId: flagEnv.environmentId,
            rolloutPercentage: variant.rolloutPercentage,
            isControl: variant.isControl,
            value: variant.value,
          },
        });
      }
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

    for (const flagEnv of flagEnvs) {
      // Remove all flag hits
      await this.prisma.flagHit.deleteMany({
        where: {
          flagEnvironmentFlagId: flagEnv.flagId,
        },
      });

      // remove all the flagEnv from the given project
      await this.prisma.flagEnvironment.deleteMany({
        where: {
          environmentId: envId,
        },
      });

      // Remove all the flag of the given env
      await this.prisma.flag.deleteMany({
        where: {
          flagEnvironment: {
            every: {
              environmentId: envId,
            },
          },
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
