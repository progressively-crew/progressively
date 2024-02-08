import { Params } from "@remix-run/react";
import { activateFlag } from "../services/activateFlag";
import { FlagStatus } from "../types";

export const toggleFlagAction = (
  formData: FormData,
  params: Params<string>,
  authCookie: string
) => {
  const nextStatus = formData.get("nextStatus");
  const flagId = formData.get("flagId");

  if (nextStatus && flagId) {
    return activateFlag(String(flagId), nextStatus as FlagStatus, authCookie);
  }

  return null;
};
