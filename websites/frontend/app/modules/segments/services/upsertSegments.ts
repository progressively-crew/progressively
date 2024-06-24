import { Constants } from "~/constants";
import { SegmentUpsertDTO } from "../types";

export const upsertSegments = (
  projectId: string,
  segmentsUpsertDto: Array<SegmentUpsertDTO>,
  accessToken: string
) => {
  return fetch(`${Constants.BackendUrl}/projects/${projectId}/segments`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(segmentsUpsertDto),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
};
