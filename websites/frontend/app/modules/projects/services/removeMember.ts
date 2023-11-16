import { Constants } from "~/constants";

export const removeMember = (
  projectId: string,
  memberId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/members/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
