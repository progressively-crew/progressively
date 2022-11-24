import { Constants } from "~/constants";

export const deleteEligibility = (eligibilityId: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/eligibilities/${eligibilityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this eligibility.");
    }
    return res.json();
  });
