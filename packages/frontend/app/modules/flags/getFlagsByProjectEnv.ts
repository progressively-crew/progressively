import { Constants } from "~/constants";

export const getFlagsByProjectEnv = async (
  projectId: string,
  envId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/projects/${projectId}/environments/${envId}/flags`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
