import { Constants } from "~/constants";

export const getExperimentById = async (
  experimentId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/experiments/${experimentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
