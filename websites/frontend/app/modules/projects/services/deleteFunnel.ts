import { Constants } from "~/constants";

export const deleteFunnel = (
  projectId: string,
  funnelId: string,
  authCookie: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/funnels/${funnelId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authCookie}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
