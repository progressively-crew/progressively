import * as Joi from 'joi';
import { Variant, VariantType } from './types';

export const FlagCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  environments: Joi.array().min(1).items(Joi.string()).required(),
  variantType: Joi.string()
    .valid(VariantType.MultiVariate, VariantType.SimpleVariant)
    .default(VariantType.SimpleVariant),
  variants: Joi.array()
    .items(
      Joi.object({
        rolloutPercentage: Joi.number().required(),
        isControl: Joi.boolean().required(),
        value: Joi.alternatives(Joi.string(), Joi.number()).required(),
      }),
    )
    .when('variantType', {
      switch: [{ is: VariantType.MultiVariate, then: Joi.required() }],
    }),
});

export type VariantCreationDTO = Omit<Variant, 'uuid'>;

export class FlagCreationDTO {
  name: string;
  description: string;
  environments: Array<string>;
  variantType: VariantType;
  variants: Array<VariantCreationDTO>;
}

export class ActivateFlagDTO {
  status: string;
}

export class ChangePercentageDTO {
  rolloutPercentage: number;
}

export const ChangePercentageSchema = Joi.object({
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
});
