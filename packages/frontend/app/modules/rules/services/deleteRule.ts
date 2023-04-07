import { Constants } from "~/constants";

export const deleteRule = (id: string, accessToken: string) =>
  fetch(`${Constants.BackendUrl}/rules/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to delete the rule."
      );
    }

    return res.json();
  });
