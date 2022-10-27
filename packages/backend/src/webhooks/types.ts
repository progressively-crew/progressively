import * as Joi from 'joi';

export enum WebhookEvents {
  ACTIVATION = 'ACTIVATION',
  DEACTIVATION = 'DEACTIVATION',
}

export interface WebhookCreationDTO {
  endpoint: string;
  event: WebhookEvents;
}

export const WebhookSchema = Joi.object({
  endpoint: Joi.string()
    .uri({
      scheme: ['http', 'https'],
    })
    .required(),
  event: Joi.string()
    .valid(WebhookEvents.ACTIVATION, WebhookEvents.DEACTIVATION)
    .required(),
});
