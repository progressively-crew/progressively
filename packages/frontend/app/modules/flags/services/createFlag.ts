import { Constants } from "~/constants";
import { FlagType } from "../types";

export const createFlag = (
  envId: string,
  name: string,
  description: string,
  type: FlagType,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/flags`, {
    method: "POST",
    body: JSON.stringify({ name, description, type }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("The flag name is already used.");
    }
    return res.json();
  });
