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

export class ChangePercentageDTO {
  rolloutPercentage: number;
}

export const ChangePercentageSchema = Joi.object({
  rolloutPercentage: Joi.number()
    .integer()
    .positive()
    .min(0)
    .max(100)
    .required(),
});
