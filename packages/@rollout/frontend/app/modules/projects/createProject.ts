import { Constants } from "~/constants";

export const createProject = (name: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/projects`, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
