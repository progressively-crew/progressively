import { Constants } from "~/constants";

export const createFlag = (
  projectId: string,
  name: string,
  description: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/flags`, {
    method: "POST",
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
