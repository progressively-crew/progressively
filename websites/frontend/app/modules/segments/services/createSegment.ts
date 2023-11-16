import { Constants } from "~/constants";

export const createSegment = (
  envId: string,
  flagId: string,
  accessToken: string,
  name: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/segments`,
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
        "Woops! Something went wrong when trying to create the segment."
      );
    }

    return res.json();
  });
