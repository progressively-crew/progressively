import { Constants } from "~/constants";

export const changePercentageFlag = (
  envId: string,
  flagId: string,
  rolloutPercentage: number,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/percentage`,
    {
      method: "PUT",
      body: JSON.stringify({ rolloutPercentage }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
