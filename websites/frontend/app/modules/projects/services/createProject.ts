import { Constants } from "~/constants";

export const createProject = (
  name: string,
  domain: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects`, {
    method: "POST",
    body: JSON.stringify({ name, domain }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
