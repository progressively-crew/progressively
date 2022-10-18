import { Constants } from "~/constants";

export const createMetric = (
  envId: string,
  flagId: string,
  name: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/metrics`,
    {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the metric."
      );
    }

    return res.json();
  });
