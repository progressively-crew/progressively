import { Constants } from "~/constants";

export const createEnv = (
  projectId: string,
  name: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/environments`, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
