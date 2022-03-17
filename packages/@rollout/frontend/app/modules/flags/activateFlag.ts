import { Constants } from "~/constants";
import { FlagStatus } from "./types";

export const activateFlag = (
  projectId: string,
  envId: string,
  flagId: string,
  status: FlagStatus,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/projects/${projectId}/environments/${envId}/flags/${flagId}`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
