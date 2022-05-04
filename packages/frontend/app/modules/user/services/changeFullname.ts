import { Constants } from "~/constants";

export const changeFullname = (fullname: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/users/me`, {
    method: "PUT",
    body: JSON.stringify({ fullname }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
