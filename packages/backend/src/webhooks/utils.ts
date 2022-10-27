import { FlagStatus } from '../flags/flags.status';
import { WebhookEvents } from './types';

export const WebhooksEventsToFlagStatus = {
  [WebhookEvents.ACTIVATION]: FlagStatus.ACTIVATED,
  [WebhookEvents.DEACTIVATION]: FlagStatus.NOT_ACTIVATED,
};
