import * as Joi from 'joi';

export const FunnelCreationSchema = Joi.object({
  name: Joi.string().required(),
});

export class FunnelCreationDTO {
  name: string;
}
