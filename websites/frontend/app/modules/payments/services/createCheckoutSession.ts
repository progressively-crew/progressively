import { Constants } from "~/constants";

export const createCheckoutSession = (
  projectId: string,
  count: number,
  accessToken: string
): Promise<{ sessionUrl: string }> =>
  fetch(`${Constants.BackendUrl}/payments/${projectId}/checkout`, {
    method: "POST",
    body: JSON.stringify({ count }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    }

    return res.json();
  });
