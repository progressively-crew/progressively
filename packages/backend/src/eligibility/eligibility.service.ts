import { Injectable } from '@nestjs/common';
import { PopulatedFlagEnv } from '../flags/types';
import { FieldRecord } from '../strategy/types';
import { PrismaService } from '../database/prisma.service';
import { EligibilityCreateDTO, EligibilityUpdateDTO } from './types';
import { Rule } from '../rule/Rule';
import { RuleService } from '../rule/rule.service';

@Injectable()
export class EligibilityService {
  constructor(
    private prisma: PrismaService,
    private ruleService: RuleService,
  ) {}

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
        rule: true,
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
        rule: {
          update: {
            fieldComparator: eligibility.rule.fieldComparator,
            fieldValue: eligibility.rule.fieldValue,
            fieldName: eligibility.rule.fieldName,
          },
        },
      },
      include: {
        rule: true,
        flagEnvironment: {
          include: {
            environment: true,
            flag: true,
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
      include: {
        rule: true,
      },
    });
  }

  addEligibilityToFlagEnv(
    envId: string,
    flagId: string,
    eligibility: EligibilityCreateDTO,
  ) {
    return this.prisma.eligibility.create({
      data: {
        rule: {
          create: {
            fieldName: eligibility.fieldName,
            fieldValue: eligibility.fieldValue,
            fieldComparator: String(eligibility.fieldComparator),
          },
        },
        flagEnvironment: {
          connect: {
            flagId_environmentId: {
              environmentId: envId,
              flagId: flagId,
            },
          },
        },
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
            strategies: {
              include: {
                rule: true,
              },
            },
            variants: true,
            eligibilities: {
              include: {
                rule: true,
              },
            },
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
      const isEligible = this.ruleService.isMatchingRule(
        eligibility.rule,
        fields,
      );

      if (isEligible) {
        return true;
      }
    }

    return false;
  }
}
