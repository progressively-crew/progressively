import { Constants } from "~/constants";

export const editProject = (
  projectId: string,
  name: string,
  domain: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({ name, domain }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
