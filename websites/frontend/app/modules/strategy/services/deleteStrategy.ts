import { Constants } from "~/constants";

export const deleteStrategy = (strategyId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/strategies/${strategyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this strategy.");
    }
    return res.json();
  });
