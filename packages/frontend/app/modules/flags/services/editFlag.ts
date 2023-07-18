import { Constants } from "~/constants";

export const editFlag = (
  projectId: string,
  flagId: string,
  name: string,
  description: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/flags/${flagId}`, {
    method: "PUT",
    body: JSON.stringify({ name, description }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("The flag name is already used.");
    }
    return res.json();
  });
