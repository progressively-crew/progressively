import { Constants } from "~/constants";

export const createFunnel = (
  projectId: string,
  name: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/funnels`, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops, something weird happened.");
    }
    return res.json();
  });
