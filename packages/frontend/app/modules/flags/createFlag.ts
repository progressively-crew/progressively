import { Constants } from "~/constants";

export const createFlag = (
  projectId: string,
  envId: string,
  name: string,
  description: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
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
