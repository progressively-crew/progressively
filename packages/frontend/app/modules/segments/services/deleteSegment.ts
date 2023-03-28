import { Constants } from "~/constants";

export const deleteSegment = (
  envId: string,
  flagId: string,
  segmentId: string,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/segments/${segmentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this segment.");
    }
    return res.json();
  });
