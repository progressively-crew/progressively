import { Constants } from "~/constants";

export const getExperimentsByEnv = async (envId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/experiments`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
