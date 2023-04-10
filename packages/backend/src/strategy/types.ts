import * as Joi from 'joi';

export enum ValueToServe {
  Boolean = 'Boolean',
  Variant = 'Variant',
  String = 'String',
  Number = 'Number',
}

const StrategyVariantDtoSchema = Joi.object({
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
  variantUuid: Joi.string().required(),
});

export const StrategyUpdateDtoSchema = Joi.object({
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
  segmentUuid: Joi.string().optional(),
});

export interface StrategyVariant {
  rolloutPercentage: number;
  variantUuid: string;
}
export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
  variants?: Array<StrategyVariant>;
}
