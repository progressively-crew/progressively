import { Constants } from "~/constants";
import { SchedulingCreateDTO } from "../types";

export const createScheduling = (
  envId: string,
  flagId: string,
  scheduling: SchedulingCreateDTO,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/scheduling`,
    {
      method: "POST",
      body: JSON.stringify(scheduling),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the scheduling."
      );
    }

    return res.json();
  });
