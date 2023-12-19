import { Constants } from "~/constants";
import { CreateFunnelEntryDTO } from "../types";

export const createFunnel = (
  envId: string,
  name: string,
  funnelEntries: Array<CreateFunnelEntryDTO>,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/environments/${envId}/funnels`, {
    method: "POST",
    body: JSON.stringify({ name, funnelEntries }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Woops, something weird happened.");
    }
    return res.json();
  });
