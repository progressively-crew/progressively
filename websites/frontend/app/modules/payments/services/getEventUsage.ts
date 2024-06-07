import { Constants } from "~/constants";

export const getEventUsage = async (projectId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/payments/${projectId}/usage`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
