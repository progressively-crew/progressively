import * as Joi from 'joi';

export class EnvironmentCreationDTO {
  name: string;
}

export const EnvironmentCreationSchema = Joi.object({
  name: Joi.string().required(),
});
