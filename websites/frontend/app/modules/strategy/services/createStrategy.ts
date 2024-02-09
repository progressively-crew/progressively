import { Constants } from "~/constants";

export const createStrategy = (flagId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/flags/${flagId}/strategies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the strategy."
      );
    }

    return res.json();
  });
