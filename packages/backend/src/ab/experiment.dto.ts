import * as Joi from 'joi';

export const VariantCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const ExperimentCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export class ExperimentCreationDTO {
  name: string;
  description: string;
}

export class VariantCreationDTO {
  name: string;
  description: string;
}
