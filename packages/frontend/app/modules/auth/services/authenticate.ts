import { Constants } from "~/constants";

export const authenticate = (username: string, password: string) =>
  fetch(`${Constants.BackendUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });
