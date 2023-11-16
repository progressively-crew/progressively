import { Constants } from "~/constants";

export const createSegmentRule = (segmentId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/segments/${segmentId}/rules`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the segment rule."
      );
    }

    return res.json();
  });
