import { Constants } from "~/constants";

export const getExperimentById = async (
  envId: string,
  experimentId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/experiments/${experimentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
