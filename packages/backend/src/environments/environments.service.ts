import { Injectable } from '@nestjs/common';
import { FlagStatus } from '../flags/flags.status';
import { PrismaService } from '../prisma.service';

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

  async getEnvironmentByClientKey(clientKey: string) {
    const flagEnv = this.prisma.flagEnvironment.findMany({
      where: {
        environment: {
          clientKey,
        },
      },
      include: {
        flag: true,
        strategies: true,
      },
    });

    return flagEnv;
  }

  createEnvironment(projectId: string, environmentName: string) {
    return this.prisma.environment.create({
      data: {
        name: environmentName,
        projectId: projectId,
      },
    });
  }

  async changeFlagForEnvStatus(
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
