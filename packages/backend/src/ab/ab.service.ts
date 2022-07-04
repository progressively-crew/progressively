import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { PrismaService } from '../prisma.service';
import { ExperimentAlreadyExists } from './errors';

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

  async createExperiment(envId: string, name: string, description: string) {
    const experimentKey = camelcase(name);

    const existingExperiment =
      await this.prisma.experimentEnvironment.findFirst({
        where: {
          environmentId: envId,
          experiment: {
            key: experimentKey,
          },
        },
      });

    if (existingExperiment) {
      throw new ExperimentAlreadyExists();
    }

    const experiment = await this.prisma.experiment.create({
      data: {
        name,
        description,
        key: experimentKey,
      },
    });

    const variationName = `${experiment.name} Control`;
    await this.prisma.variant.create({
      data: {
        key: camelcase(variationName),
        name: variationName,
        isControl: true,
        experimentUuid: experiment.uuid,
        description: `This is the control variant of the ${experiment.name} experiment`,
      },
    });

    await this.prisma.experimentEnvironment.create({
      data: {
        experimentId: experiment.uuid,
        environmentId: envId,
      },
    });

    return experiment;
  }
}
