import { Constants } from "~/constants";

export const getExperimentHits = async (
  experimentId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/experiments/${experimentId}/hits`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
