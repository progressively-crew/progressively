import { Constants } from "~/constants";

export const editSegment = (
  name: string,
  segmentId: string,
  accessToken: string
) => {
  return fetch(`${Constants.BackendUrl}/segments/${segmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }
    return res.json();
  });
};
