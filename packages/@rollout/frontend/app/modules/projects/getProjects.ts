import { Constants } from "~/constants";

export const getProjects = (accessToken: string) => {
  return fetch(`${Constants.BackendUrl}/projects`, {
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
