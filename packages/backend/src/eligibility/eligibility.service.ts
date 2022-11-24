import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EligibilityCreationDTO } from './types';

@Injectable()
export class EligibilityService {
  constructor(private prisma: PrismaService) {}

  async hasPermissionOnEligibility(
    eligibilityId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const flagOfProject = await this.prisma.userProject.findFirst({
      where: {
        userId,
        project: {
          environments: {
            some: {
              flagEnvironment: {
                some: { Eligibility: { some: { uuid: eligibilityId } } },
              },
            },
          },
        },
      },
    });

    if (!flagOfProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(flagOfProject.role);
  }

  deleteEligibility(eligibilityId: string) {
    return this.prisma.eligibility.delete({
      where: {
        uuid: eligibilityId,
      },
      include: {
        FlagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
          },
        },
      },
    });
  }

  listEligibilities(envId: string, flagId: string) {
    return this.prisma.eligibility.findMany({
      where: {
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  addEligibilityToFlagEnv(
    envId: string,
    flagId: string,
    eligibility: EligibilityCreationDTO,
  ) {
    return this.prisma.eligibility.create({
      data: {
        fieldName: eligibility.fieldName,
        fieldValue: eligibility.fieldValue,
        fieldComparator: eligibility.fieldComparator,
        flagEnvironmentEnvironmentId: envId,
        flagEnvironmentFlagId: flagId,
      },
    });
  }

  getEligibilityFlagEnv(eligibilityId: string) {
    return this.prisma.eligibility.findFirst({
      where: {
        uuid: eligibilityId,
      },
      include: {
        FlagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
          },
        },
      },
    });
  }
}
