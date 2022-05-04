import * as Joi from 'joi';

export const FlagCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export class FlagCreationDTO {
  name: string;
  description: string;
}

export class ActivateFlagDTO {
  status: string;
}
