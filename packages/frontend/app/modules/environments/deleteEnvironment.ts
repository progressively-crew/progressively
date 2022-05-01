import { Constants } from "~/constants";

export const deleteEnvironment = (
  projectId: string,
  envId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this project.");
    }
    return res.json();
  });
