import * as Joi from 'joi';
import { ComparatorEnum } from './comparators/types';

export interface RuleType {
  fieldName: string;
  fieldComparator: ComparatorEnum;
  fieldValue: string;
}

export const RuleSchema = Joi.object({
  fieldName: Joi.string().required(),
  fieldComparator: Joi.string()
    .valid(ComparatorEnum.Equals, ComparatorEnum.Contains)
    .required(),
  fieldValue: Joi.string().required(),
});

export type FieldRecord = Record<string, string | number | boolean>;
