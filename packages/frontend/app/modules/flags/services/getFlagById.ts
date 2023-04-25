import { Constants } from "~/constants";

export const getFlagById = async (flagId: string, accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/flags/${flagId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
