import { Constants } from "~/constants";

export const checkout = (priceId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/checkout`, {
    method: "POST",
    body: JSON.stringify({ priceId }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
