import { Constants } from "~/constants";
import { WebhookCreationDTO } from "../types";

export const createWebhook = (
  flagId: string,
  webhook: WebhookCreationDTO,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/flags/${flagId}/webhooks`, {
    method: "POST",
    body: JSON.stringify(webhook),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the webhook."
      );
    }

    return res.json();
  });
