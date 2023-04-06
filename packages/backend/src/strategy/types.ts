import * as Joi from 'joi';

export enum ValueToServe {
  Boolean = 'Boolean',
  Variant = 'Variant',
  String = 'String',
  Number = 'Number',
}

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
});

export interface StrategyUpdateDto {
  rolloutPercentage?: number;
  valueToServeType: ValueToServe;
  valueToServe?: string;
}
