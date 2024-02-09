import { Constants } from "~/constants";
import { FlagStatus } from "../types";

export const activateFlag = (
  flagId: string,
  status: FlagStatus,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/flags/${flagId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
