import * as Joi from 'joi';
import { Variant } from './types';

export const FlagCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const VariantSchema = Joi.object({
  rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
  value: Joi.string().required(),
});

export const VariantsSchema = Joi.array().items(
  Joi.object({
    uuid: Joi.string().required(),
    rolloutPercentage: Joi.number().integer().min(0).max(100).required(),
    isControl: Joi.boolean(),
    value: Joi.string().required(),
  }),
);

export type VariantCreationDTO = Omit<Variant, 'uuid' | 'isControl'>;

export class FlagCreationDTO {
  name: string;
  description: string;
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

export const MetricSchema = Joi.object({
  name: Joi.string().required(),
  variantId: Joi.string().optional(),
});
