import { Constants } from "~/constants";
import { StrategyCreateDTO } from "./types";

export const createStrategy = (
  envId: string,
  flagId: string,
  strategy: StrategyCreateDTO,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/strategies`,
    {
      method: "POST",
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
