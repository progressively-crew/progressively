import { Tag } from "~/components/Tag";
import { WebhookEvents } from "../types";

export interface WebhookEventProps {
  value: WebhookEvents;
}

export const WebhookEvent = ({ value }: WebhookEventProps) => {
  if (value === WebhookEvents.ACTIVATION) {
    return (
      <Tag color="successFg" background="successBg">
        Activation
      </Tag>
    );
  }

  if (value === WebhookEvents.DEACTIVATION) {
    return (
      <Tag color="errorFg" background="errorBg">
        Deactivation
      </Tag>
    );
  }

  return null;
};
