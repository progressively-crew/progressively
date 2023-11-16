import { Constants } from "~/constants";
import { StrategyUpdateDto } from "../types";

export const editStrategy = (
  strategyId: string,
  strategyDto: StrategyUpdateDto,
  accessToken: string
) => {
  return fetch(`${Constants.BackendUrl}/strategies/${strategyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(strategyDto),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }
    return res.json();
  });
};
