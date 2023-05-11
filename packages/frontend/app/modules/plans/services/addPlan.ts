import { Constants } from "~/constants";

export const addPlan = (
  projectCount: number,
  envCount: number,
  evalCount: number,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/users/billing`, {
    method: "POST",
    body: JSON.stringify({ projectCount, envCount, evalCount }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong when trying to add the plan.");
    }
    return res.json();
  });
