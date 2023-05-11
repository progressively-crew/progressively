import { Constants } from "~/constants";

export const getBillingInfo = async (accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/users/billing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};
