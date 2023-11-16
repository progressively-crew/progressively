import { Constants } from "~/constants";

export const changePassword = (
  password: string,
  confirmationPassword: string,
  accessToken: string
) => {
  return fetch(`${Constants.BackendUrl}/users/change-password`, {
    method: "POST",
    body: JSON.stringify({ password, confirmationPassword }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
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
