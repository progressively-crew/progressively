import * as Joi from 'joi';
import { RuleSchema, RuleType } from '../rule/types';
import { ComparatorEnum } from '../rule/comparators/types';

export class EligibilityUpdateDTO {
  uuid: string;
  rule: RuleType;
}

export class EligibilityCreateDTO {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export class Eligibility {
  uuid: string;
  rule: RuleType;
  flagEnvironmentFlagId: string;
  flagEnvironmentEnvironmentId: string;
}

export const EligibilitySchema = Joi.object({
  uuid: Joi.string().required(),
  rule: RuleSchema,
});
