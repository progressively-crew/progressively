import { Constants } from "~/constants";

export const deleteProject = (projectId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}`, {
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
