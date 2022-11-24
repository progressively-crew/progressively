import { Constants } from "~/constants";
import { AdditionalAudienceCreateDTO } from "../types";

export const editStrategy = (
  stratId: string,
  strategy: AdditionalAudienceCreateDTO,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/strategies/${stratId}`, {
    method: "PUT",
    body: JSON.stringify(strategy),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to editing the strategy."
      );
    }

    return res.json();
  });
