import { Constants } from "~/constants";
import { AdditionalAudienceUpdateDTO } from "../types";

export const updateStrategy = (
  id: string,
  updateStrategyDto: AdditionalAudienceUpdateDTO,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/strategies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateStrategyDto),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to update the aditional audience."
      );
    }

    return res.json();
  });
