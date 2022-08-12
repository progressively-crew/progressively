import { Constants } from "~/constants";
import { StrategyCreateDTO } from "../types";

export const editStrategy = (
  envId: string,
  flagId: string,
  strategy: StrategyCreateDTO & { uuid: string },
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/strategies/${strategy.uuid}`,
    {
      method: "PUT",
      body: JSON.stringify(strategy),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the strategy."
      );
    }

    return res.json();
  });
