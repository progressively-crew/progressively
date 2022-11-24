import { Constants } from "~/constants";
import { EligibilityCreateDTO } from "../types";

export const createEligibility = (
  envId: string,
  flagId: string,
  eligibility: EligibilityCreateDTO,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/eligibilities`,
    {
      method: "POST",
      body: JSON.stringify(eligibility),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the eligibility."
      );
    }

    return res.json();
  });
