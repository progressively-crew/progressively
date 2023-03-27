import * as Joi from 'joi';
import { RuleSchema, RuleType } from '../rule/types';
import { ComparatorEnum } from '../rule/comparators/types';

export interface FlagDict {
  [key: string]: boolean;
}

export type FieldRecord = Record<string, string | number | boolean>;

export interface RolloutStrategy {
  uuid: string;
  rule: RuleType;
  flagEnvironmentFlagId?: string;
  flagEnvironmentEnvironmentId?: string;
  valueToServeType: string;
  valueToServe: string;
}

export class StrategyUpdateDTO {
  uuid: string;
  rule: RuleType;
  valueToServeType: string;
  valueToServe: string;
}

export enum StrategyValueToServe {
  Boolean = 'Boolean',
  String = 'String',
  Variant = 'Variant',
}

export const StrategySchema = Joi.object({
  uuid: Joi.string().required(),
  rule: RuleSchema,
  valueToServeType: Joi.string()
    .valid(
      StrategyValueToServe.Boolean,
      StrategyValueToServe.String,
      StrategyValueToServe.Variant,
    )
    .required(),
  valueToServe: Joi.string().required(),
});
