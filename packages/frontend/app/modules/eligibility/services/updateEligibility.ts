import { Constants } from "~/constants";
import { UpsertEligibilityDTO } from "../types";

export const updateEligibility = (
  id: string,
  updateEligibilityDTO: UpsertEligibilityDTO,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/eligibilities/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateEligibilityDTO),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the eligibility."
      );
    }

    return res.json();
  });
