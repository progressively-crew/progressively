import { Constants } from "~/constants";

export const getFlagsByProjectEnv = async (
  envId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
