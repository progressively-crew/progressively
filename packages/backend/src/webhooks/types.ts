import * as Joi from 'joi';

export enum WebhookEvents {
  ACTIVATION = 'ACTIVATION',
  DEACTIVATION = 'DEACTIVATION',
}

export interface WebhookCreationDTO {
  endpoint: string;
  event: WebhookEvents;
}

export interface Webhook {
  endpoint: string;
  event: WebhookEvents;
  secret: string;
  uuid: string;
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
