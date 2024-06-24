import { Constants } from "~/constants";

export const getSegments = (projectId: string, accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/projects/${projectId}/segments`, {
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
