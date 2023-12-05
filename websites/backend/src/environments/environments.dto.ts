import * as Joi from 'joi';

export class EnvironmentCreationDTO {
  name: string;
  domain?: string;
}

export const EnvironmentCreationSchema = Joi.object({
  name: Joi.string().required(),
  domain: Joi.string().allow(null),
});
