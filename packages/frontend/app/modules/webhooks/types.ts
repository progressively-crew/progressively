export enum WebhookEvents {
  ACTIVATION = "ACTIVATION",
  DEACTIVATION = "DEACTIVATION",
}

export interface WebhookCreationDTO {
  endpoint: string;
  event: WebhookEvents;
}

export interface Webhook {
  endpoint: string;
  event: WebhookEvents;
  uuid: string;
}
