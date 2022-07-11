import { Constants } from "~/constants";
import { ExperimentStatus } from "../types";

export const activateExperiment = (
  envId: string,
  experimentId: string,
  status: ExperimentStatus,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/experiments/${experimentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
