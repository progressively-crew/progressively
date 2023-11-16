import { Constants } from "~/constants";
import { RuleUpdateDto } from "../types";

export const updateRule = (
  id: string,
  ruleDto: RuleUpdateDto,
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
        "Woops! Something went wrong when trying to create the rule."
      );
    }

    return res.json();
  });
