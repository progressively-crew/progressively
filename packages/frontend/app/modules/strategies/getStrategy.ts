import { Constants } from "~/constants";

export const getStrategy = (
  projectId: string,
  envId: string,
  flagId: string,
  stratId: string,
  accessToken: string
) => {
  return fetch(`${Constants.BackendUrl}/strategies/${stratId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
};
