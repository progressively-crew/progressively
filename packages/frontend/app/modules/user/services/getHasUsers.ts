import { Constants } from "~/constants";

export const getHasUsers = () => {
  return fetch(`${Constants.BackendUrl}/users`).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
};
