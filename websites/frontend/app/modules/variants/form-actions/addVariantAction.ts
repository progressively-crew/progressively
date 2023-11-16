import { Params } from "@remix-run/react";
import { createVariant } from "../services/createVariant";
import { VariantCreateDTO } from "../types";

export const addVariantAction = async (
  formData: FormData,
  params: Params<string>,
  authCookie: string
) => {
  const flagId = String(params.flagId);
  const envId = String(params.env);

  const value = String(formData.get("value"));

  if (!value) {
    return {
      errors: {
        value: "The variant value is not valid. Make sure to fill one.",
      },
    };
  }

  try {
    const variant: VariantCreateDTO = {
      rolloutPercentage: 0,
      value,
    };

    await createVariant(envId, flagId as string, variant, authCookie);

    return {
      successCreated: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};
