import { Constants } from "~/constants";

export const getProjectFlags = async (projectId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/flags`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
