import { Injectable } from '@nestjs/common';
import { ExperimentStatus } from 'src/ab/types';
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

  async changeExperimentForEnvStatus(
    environmentId: string,
    experimentId: string,
    status: ExperimentStatus,
  ) {
    return this.prisma.experimentEnvironment.update({
      where: {
        experimentId_environmentId: {
          experimentId,
          environmentId,
        },
      },
      data: {
        status,
      },
      include: {
        environment: true,
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

    // Remove A/B tests
    const experimentsEnv = await this.prisma.experimentEnvironment.findMany({
      where: {
        environmentId: envId,
      },
    });

    for (const experimentEnv of experimentsEnv) {
      const variants = await this.prisma.variant.findMany({
        where: {
          experimentUuid: experimentEnv.experimentId,
        },
      });

      for (const variant of variants) {
        await this.prisma.variantHit.deleteMany({
          where: {
            variantUuid: variant.uuid,
          },
        });
      }

      await this.prisma.variant.deleteMany({
        where: {
          experimentUuid: experimentEnv.experimentId,
        },
      });
    }

    await this.prisma.experimentEnvironment.deleteMany({
      where: {
        environmentId: envId,
      },
    });

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
