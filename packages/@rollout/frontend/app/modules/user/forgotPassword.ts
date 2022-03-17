import { Constants } from "~/constants";

export const forgotPassword = (email: string) => {
  return fetch(`${Constants.BackendUrl}/users/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("The email is required");
      }

      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
};
