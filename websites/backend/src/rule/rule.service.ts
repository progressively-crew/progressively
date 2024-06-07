import { Injectable } from '@nestjs/common';
import { RuleType } from './types';
import { FieldRecord } from './types';
import { Rule } from './Rule';

@Injectable()
export class RuleService {
  isMatchingRule(rule: Partial<RuleType>, fields: FieldRecord) {
    // Dealing with regular rules
    const clientFieldValue = fields[rule.fieldName] || '';
    const fieldValues = rule.fieldValue?.split('\n') || '';

    for (const fieldValue of fieldValues) {
      const ruleCheck = Rule.createFrom(fieldValue, rule.fieldComparator);

      if (ruleCheck.isSatisfiedBy(clientFieldValue)) {
        return true;
      }
    }

    return false;
  }

  // Make sure the list of rules are matching with the "and" operator
  isMatchingAllRules(rules: Array<Partial<RuleType>>, fields: FieldRecord) {
    if (rules.length === 0) return true;

    return rules.every((rule) => this.isMatchingRule(rule, fields));
  }
}
