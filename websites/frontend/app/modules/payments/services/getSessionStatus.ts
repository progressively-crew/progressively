import { Constants } from "~/constants";

export const getSessionStatus = (
  projectId: string,
  sessionId: string,
  accessToken: string
): Promise<{
  customerEmail: string;
  status: "open" | "complete" | "expired";
}> =>
  fetch(
    `${Constants.BackendUrl}/payments/checkout/${projectId}/session/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => {
    if (!res.ok) {
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    }

    return res.json();
  });
