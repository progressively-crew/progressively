import { Constants } from "~/constants";

export const checkout = (priceId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/checkout`, {
    method: "POST",
    body: JSON.stringify({ priceId }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops! Something went wrong in the server.");
    }

    return res.json();
  });
