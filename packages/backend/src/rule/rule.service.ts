import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RuleType } from './types';
import { FieldRecord } from './types';
import { Rule } from './Rule';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async hasPermissionOnRule(
    ruleId: string,
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
                some: {
                  Segment: { some: { rule: { some: { uuid: ruleId } } } },
                },
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

  editRule(ruleId: string, rule: RuleType) {
    return this.prisma.rule.update({
      where: { uuid: ruleId },
      data: {
        fieldComparator: rule.fieldComparator,
        fieldName: rule.fieldName,
        fieldValue: rule.fieldValue,
      },
      include: {
        Segment: true,
      },
    });
  }

  deleteRule(ruleId: string) {
    return this.prisma.rule.delete({
      where: {
        uuid: ruleId,
      },
      include: {
        Segment: true,
      },
    });
  }

  isMatchingRule(rule: RuleType, fields: FieldRecord) {
    const clientFieldValue = fields[rule.fieldName] || '';
    const fieldValues = rule.fieldValue.split('\n');

    for (const fieldValue of fieldValues) {
      const ruleCheck = Rule.createFrom(fieldValue, rule.fieldComparator);

      if (ruleCheck.isSatisfiedBy(clientFieldValue)) {
        return true;
      }
    }

    return false;
  }

  // Make sure the list of rules are matching with the "and" operator
  isMatchingAllRules(rules: Array<RuleType>, fields: FieldRecord) {
    if (rules.length === 0) return false;

    return rules.every((rule) => this.isMatchingRule(rule, fields));
  }
}
