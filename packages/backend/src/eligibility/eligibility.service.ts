import { Injectable } from '@nestjs/common';
import { PopulatedFlagEnv } from '../flags/types';
import { FieldRecord } from '../strategy/types';
import { PrismaService } from '../database/prisma.service';
import { EligibilityUpdateDTO } from './types';
import { ComparatorEnum } from '../shared/utils/comparators/types';
import { ComparatorFactory } from '../shared/utils/comparators/comparatorFactory';

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
                some: { eligibilities: { some: { uuid: eligibilityId } } },
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
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
          },
        },
      },
    });
  }

  updateEligibility(uuid: string, eligibility: EligibilityUpdateDTO) {
    return this.prisma.eligibility.update({
      where: {
        uuid,
      },
      data: {
        fieldComparator: eligibility.fieldComparator,
        fieldValue: eligibility.fieldValue,
        fieldName: eligibility.fieldName,
      },
      include: {
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
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
      orderBy: {
        uuid: 'asc',
      },
    });
  }

  addEligibilityToFlagEnv(
    envId: string,
    flagId: string,
    eligibility: EligibilityUpdateDTO,
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
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: true,
            variants: true,
            eligibilities: true,
          },
        },
      },
    });
  }

  isEligible(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    // This condition means that there are no restrictions
    // Every body is concerned by the flag
    if (flagEnv.eligibilities.length === 0) return true;

    for (const eligibility of flagEnv.eligibilities) {
      const fieldComparator = eligibility.fieldComparator as ComparatorEnum;
      const isValid = ComparatorFactory.create(fieldComparator);
      const fieldValues = eligibility.fieldValue.split('\n');

      for (const fieldValue of fieldValues) {
        const clientFieldValue = fields[eligibility.fieldName] || '';

        if (isValid(fieldValue, clientFieldValue)) {
          return true;
        }
      }
    }

    return false;
  }
}
