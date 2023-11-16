import { Constants } from "~/constants";

export const createMetric = (
  envId: string,
  accessToken: string,
  name: string,
  variantId?: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/metrics`, {
    method: "POST",
    body: JSON.stringify({ name, variantId }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the metric."
      );
    }

    return res.json();
  });
