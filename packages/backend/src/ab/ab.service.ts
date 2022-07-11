import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { FieldRecord } from '../strategy/types';
import { PrismaService } from '../prisma.service';
import { VariantAlreadyExists } from './errors';
import { ExperimentStatus, PopulatedExperimentEnv, VariantHit } from './types';
import { isInBucket } from '../strategy/utils';

@Injectable()
export class AbService {
  constructor(private prisma: PrismaService) {}

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
