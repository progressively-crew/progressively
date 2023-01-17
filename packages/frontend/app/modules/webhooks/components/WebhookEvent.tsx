import { Tag } from "~/components/Tag";
import { WebhookEvents } from "../types";

export interface WebhookEventProps {
  value: WebhookEvents;
}

export const WebhookEvent = ({ value }: WebhookEventProps) => {
  if (value === WebhookEvents.ACTIVATION) {
    return <Tag size="S">Flag activation</Tag>;
  }

  if (value === WebhookEvents.DEACTIVATION) {
    return <Tag size="S">Flag deactivation</Tag>;
  }

  return null;
};
