import { Constants } from "~/constants";

export const deleteFlag = (
  envId: string,
  flagId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/flags/${flagId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this flag.");
    }
    return res.json();
  });
