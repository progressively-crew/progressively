import * as Joi from 'joi';
import { RuleUpdateDto } from '../rule/types';
import { ComparatorEnum } from '../rule/comparators/types';

export enum ValueToServe {
  Boolean = 'Boolean',
  Variant = 'Variant',
  String = 'String',
  Number = 'Number',
}

export enum WhenPredicate {
  Always = 'ALWAYS',
  BeforeThe = 'BEFORE_THE',
  AfterThe = 'AFTER_THE',
}

const StrategyVariantDtoSchema = Joi.object({
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
  variantUuid: Joi.string().required(),
});

export const StrategyUpdateDtoSchema = Joi.array().items(
  Joi.object({
    rolloutPercentage: Joi.number().integer().min(0).max(100),
    valueToServe: Joi.string().optional(),
    valueToServeType: Joi.string()
      .valid(
        ValueToServe.Boolean,
        ValueToServe.Number,
        ValueToServe.String,
        ValueToServe.Variant,
      )
      .required(),
    variants: Joi.any().when('valueToServeType', {
      is: ValueToServe.Variant,
      then: Joi.array().items(StrategyVariantDtoSchema),
      otherwise: Joi.optional(),
    }),
    rules: Joi.array().items(
      Joi.object({
        fieldName: Joi.string().allow(''),
        fieldComparator: Joi.string()
          .allow('')
          .valid(ComparatorEnum.Contains, ComparatorEnum.Equals),
        fieldValue: Joi.string().allow(''),
      }),
    ),
    whenPredicate: Joi.string()
      .valid(
        WhenPredicate.Always,
        WhenPredicate.AfterThe,
        WhenPredicate.BeforeThe,
      )
      .required(),
    whenTimestamp: Joi.date(),
  }),
);

export interface StrategyVariant {
  rolloutPercentage: number;
  variantUuid: string;
}
export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
  variants?: Array<StrategyVariant>;
  rules: Array<RuleUpdateDto>;
  whenPredicate: WhenPredicate;
  whenTimestamp?: Date;
}
