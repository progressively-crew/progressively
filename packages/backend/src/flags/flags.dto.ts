import * as Joi from 'joi';

export const FlagCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
