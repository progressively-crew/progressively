import { Constants } from "~/constants";

export const createVariant = (
  experimentId: string,
  name: string,
  description: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/experiments/${experimentId}/variants`, {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("The variant name is already used.");
    }
    return res.json();
  });
