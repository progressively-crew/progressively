import { Constants } from "~/constants";

export const createUser = (
  fullname: string,
  email: string,
  password: string
) => {
  return fetch(`${Constants.BackendUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ fullname, email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("This email is already used.");
      }

      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
};
