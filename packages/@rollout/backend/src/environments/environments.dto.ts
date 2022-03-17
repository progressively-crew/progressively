import * as Joi from 'joi';

export interface EnvironmentDTO {
  name: string;
}

export const EnvironmentCreationSchema = Joi.object({
  name: Joi.string().required(),
});
