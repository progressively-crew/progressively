import { Constants } from "~/constants";

export const getSegment = (segmentId: string, accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/segments/${segmentId}`, {
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
