import { Constants } from "~/constants";

export const createEnv = (
  projectId: string,
  name: string,
  accessToken: string,
  domain?: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/environments`, {
    method: "POST",
    body: JSON.stringify({ name, domain: domain || null }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Woops something wrong just happened.");
  });
