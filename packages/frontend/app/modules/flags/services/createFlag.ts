import { Constants } from "~/constants";

export const createFlag = (
  envId: string,
  name: string,
  description: string,
  environments: Array<string>,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
    method: "POST",
    body: JSON.stringify({ name, description, environments }),
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
