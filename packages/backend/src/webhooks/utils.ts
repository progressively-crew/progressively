import got from 'got';
import { FlagStatus } from '../flags/flags.status';
import { Webhook, WebhookEvents } from './types';

export const WebhooksEventsToFlagStatus = {
  [WebhookEvents.ACTIVATION]: FlagStatus.ACTIVATED,
  [WebhookEvents.DEACTIVATION]: FlagStatus.NOT_ACTIVATED,
};

export const post = (webhook: Webhook) => {
  return got.post(webhook.endpoint);
};
