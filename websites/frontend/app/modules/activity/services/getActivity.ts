import { Constants } from "~/constants";
import { Activity } from "../types";

export const getActivity = (
  flagId: string,
  accessToken: string
): Promise<Array<Activity>> => {
  return fetch(`${Constants.BackendUrl}/flags/${flagId}/activity`, {
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
