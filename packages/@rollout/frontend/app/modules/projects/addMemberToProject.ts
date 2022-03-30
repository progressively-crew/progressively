import { Constants } from "~/constants";

export const addMemberToProject = (
  projectId: string,
  memberEmail: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/projects/${projectId}/members`, {
    method: "POST",
    body: JSON.stringify({ email: memberEmail }),
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
