import { Constants } from "~/constants";
import { VariantCreateDTO } from "../types";

export const createVariant = (
  envId: string,
  flagId: string,
  variant: VariantCreateDTO,
  accessToken: string
) =>
  fetch(
    `${Constants.BackendUrl}/environments/${envId}/flags/${flagId}/variants`,
    {
      method: "POST",
      body: JSON.stringify(variant),
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
