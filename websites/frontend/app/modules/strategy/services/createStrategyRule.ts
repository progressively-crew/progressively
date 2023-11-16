import { Constants } from "~/constants";

export const createStrategyRule = (strategyId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/strategies/${strategyId}/rules`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the strategy rule."
      );
    }

    return res.json();
  });
