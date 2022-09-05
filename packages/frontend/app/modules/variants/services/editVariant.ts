import { Constants } from "~/constants";
import { Variant } from "../types";

export const editVariant = (
  envId: string,
  flagId: string,
  variants: Array<Variant>,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
    {
      method: "PUT",
      body: JSON.stringify(variants),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(
        "Woops! Something went wrong when trying to create the variant."
      );
    }

    return res.json();
  });
