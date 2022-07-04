import { Constants } from "~/constants";

export const getExperimentById = async (
  env: string,
  experimentId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${env}/experiments/${experimentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
