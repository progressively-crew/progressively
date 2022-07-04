import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AbService {
  constructor(private prisma: PrismaService) {}

  experimentsByEnv(envId: string) {
    return this.prisma.experiment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ExperimentEnvironment: {
          some: {
            environmentId: envId,
          },
        },
      },
    });
  }

  async hasPermissionOnExperiment(
    experimentId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const experimentOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: { ExperimentEnvironment: { some: { experimentId } } },
          },
        },
      },
    });

    if (!experimentOfProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(experimentOfProject.role);
  }

  getExperimentById(experimentId: string) {
    return this.prisma.experiment.findFirst({
      where: {
        uuid: experimentId,
      },
      include: {
        variants: true,
      },
    });
  }
}
