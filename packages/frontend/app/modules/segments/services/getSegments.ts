import { Constants } from "~/constants";

export const getSegments = (
  envId: string,
  flagId: string,
  accessToken: string
) => {
  return fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/segments`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }
    return res.json();
  });
};
