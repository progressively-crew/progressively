import { Constants } from "~/constants";

export const deleteStrategy = (
  projectId: string,
  envId: string,
  flagId: string,
  stratId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${stratId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this flag.");
    }
    return res.json();
  });
