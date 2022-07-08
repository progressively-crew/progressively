import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { FieldRecord } from '../strategy/types';
import { PrismaService } from '../prisma.service';
import { ExperimentAlreadyExists, VariantAlreadyExists } from './errors';
import { ExperimentStatus, PopulatedExperimentEnv, VariantHit } from './types';
import { isInBucket } from '../strategy/utils';

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

  async createVariant(experimentId: string, name: string, description: string) {
    const variantKey = camelcase(name);

    const existingVariant = await this.prisma.variant.findFirst({
      where: {
        experimentUuid: experimentId,
        key: variantKey,
      },
    });

    if (existingVariant) {
      throw new VariantAlreadyExists();
    }

    const variant = await this.prisma.variant.create({
      data: {
        name,
        description,
        key: variantKey,
        experimentUuid: experimentId,
      },
    });

    return variant;
  }

  deleteExperiment(experimentId: string) {
    return this.prisma.experiment.deleteMany({
      where: {
        uuid: experimentId,
      },
    });
  }

  listExperimentHits(experimentId: string): Promise<Array<VariantHit>> {
    return this.prisma.$queryRaw`
      SELECT count(id)::int, "VariantHit"."date", "Variant"."uuid", "Variant"."name", "Variant"."isControl"
      FROM "VariantHit"
      INNER JOIN "Variant" ON "Variant"."uuid" = "VariantHit"."variantUuid"
      WHERE "Variant"."experimentUuid" = ${experimentId}
      GROUP BY "Variant"."uuid", "VariantHit"."date"
      ORDER BY "VariantHit"."date", "Variant"."uuid"`;
  }

  resolveExperimentVariantValue(
    experimentEnv: PopulatedExperimentEnv,
    fields: FieldRecord,
  ) {
    const variants = experimentEnv.experiment.variants;
    const controlVariant = variants.find((variant) => variant.isControl);

    if (experimentEnv.status !== ExperimentStatus.ACTIVATED) {
      return controlVariant?.key;
    }

    if (!fields.id) {
      return controlVariant?.key;
    }

    const userId = fields.id;
    const experimentKey = experimentEnv.experiment.key;
    const rolloutPercentage = 100 / variants.length;

    const resolvedVariant = variants.find((variant) => {
      const key = `${experimentKey}-${variant.key}`;

      return isInBucket(key, String(userId), rolloutPercentage);
    });

    return resolvedVariant?.key || controlVariant?.key;
  }
}
