import { Constants } from "~/constants";

export const deleteWebhook = (webhookId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/webhooks/${webhookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this webhook.");
    }
    return res.json();
  });
