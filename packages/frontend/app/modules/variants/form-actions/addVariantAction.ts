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
  const isControl = Boolean(formData.get("isControl"));

  if (!value) {
    return {
      errors: {
        invalidValue: "The variant value is not valid. Make sure to fill one.",
      },
    };
  }

  try {
    const variant: VariantCreateDTO = {
      isControl,
      rolloutPercentage: 0,
      value,
    };

    await createVariant(envId, flagId as string, variant, authCookie);

    return {
      successCreated: true,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};
