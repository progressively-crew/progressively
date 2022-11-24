import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EligibilityCreationDTO } from './types';

@Injectable()
export class EligibilityService {
  constructor(private prisma: PrismaService) {}

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
        name: eligibility.name,
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
