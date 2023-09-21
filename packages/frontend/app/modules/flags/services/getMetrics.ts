import { Constants } from "~/constants";

export const getMetrics = (envId: string, accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/environments/${envId}/metrics`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }
    return res.json();
  });
};
