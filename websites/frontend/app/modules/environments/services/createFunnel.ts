import { Constants } from "~/constants";

export const createFunnel = (
  envId: string,
  name: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/funnels`, {
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
