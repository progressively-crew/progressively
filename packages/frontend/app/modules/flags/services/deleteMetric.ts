import { Constants } from "~/constants";

export const deleteMetric = (
  envId: string,
  flagId: string,
  metricId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/metrics/${metricId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this metric.");
    }
    return res.json();
  });
