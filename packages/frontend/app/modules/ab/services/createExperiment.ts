import { Constants } from "~/constants";

export const createExperiment = (
  envId: string,
  name: string,
  description: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/experiments`, {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("The experiment name is already used.");
    }
    return res.json();
  });
