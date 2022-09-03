import { Params } from "@remix-run/react";
import { activateFlag } from "../services/activateFlag";
import { FlagStatus } from "../types";

export const toggleFlagAction = async (
  formData: FormData,
  params: Params<string>,
  authCookie: string
) => {
  const flagId = String(params.flagId);
  const envId = String(params.env);
  const nextStatus = formData.get("nextStatus");

  if (nextStatus && flagId) {
    await activateFlag(envId, flagId, nextStatus as FlagStatus, authCookie);
  }

  return null;
};
