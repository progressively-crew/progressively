import * as Joi from 'joi';
import { RuleSchema, RuleType } from '../rule/types';

export enum ValueToServe {
  Boolean = 'Boolean',
  Variant = 'Variant',
  String = 'String',
  Number = 'Number',
}

export const StrategyUpdateDto = Joi.object({
  rolloutPercentage: Joi.number().integer().min(0).max(100),
  rules: Joi.array().items(RuleSchema),
  valueToServe: Joi.string(),
  valueToServeType: Joi.string()
    .valid(
      ValueToServe.Boolean,
      ValueToServe.Number,
      ValueToServe.String,
      ValueToServe.Variant,
    )
    .required(),
});

export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  rules?: Array<RuleType>;
  valueToServe?: string;
}
