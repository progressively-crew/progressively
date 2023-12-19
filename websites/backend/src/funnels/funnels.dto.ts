import * as Joi from 'joi';

export const FunnelCreationSchema = Joi.object({
  name: Joi.string().required(),
  funnelEntries: Joi.array().items(
    Joi.object({
      flagUuid: Joi.string(),
      eventName: Joi.string(),
      flagName: Joi.string(),
      variant: Joi.string(),
    }),
  ),
});

export class FunnelCreationDTO {
  name: string;
  funnelEntries: Array<CreateFunnelEntryDTO>;
}

export interface CreateFunnelEntryDTO {
  flagUuid?: string;
  flagName?: string;
  eventName?: string;
  variant?: string;
}
