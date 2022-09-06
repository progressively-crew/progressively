import { Constants } from "~/constants";
import { Variant } from "../types";

export const editVariant = async (
  envId: string,
  flagId: string,
  variants: Array<Variant>,
  accessToken: string
) => {
  const res = await fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
    {
      method: "PUT",
      body: JSON.stringify(variants),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
