import { Constants } from "~/constants";

export const getWebhooks = (flagId: string, accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/flags/${flagId}/webhooks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }
    return res.json();
  });
};
