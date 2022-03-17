import { Constants } from "~/constants";

export const resetPassword = (password: string, token: string) => {
  return fetch(`${Constants.BackendUrl}/users/reset-password`, {
    method: "POST",
    body: JSON.stringify({ password, token }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("An information is missing");
      }

      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
};
