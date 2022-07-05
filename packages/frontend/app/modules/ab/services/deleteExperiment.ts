import { Constants } from "~/constants";

export const deleteExperiment = (experimentId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/experiments/${experimentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this experiment.");
    }
    return res.json();
  });
