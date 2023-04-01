import { Constants } from "~/constants";
import { RuleType } from "../types";

export const updateRule = (
  id: string,
  ruleDto: RuleType,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/rules/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ruleDto),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the eligibility."
      );
    }

    return res.json();
  });
