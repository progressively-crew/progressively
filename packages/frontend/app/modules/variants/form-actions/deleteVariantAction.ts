import { Params } from "@remix-run/react";
import { deleteVariant } from "../services/deleteVariant";

export const deleteVariantAction = async (
  formData: FormData,
  params: Params<string>,
  authCookie: string
) => {
  const flagId = String(params.flagId);
  const envId = String(params.env);

  try {
    const uuid = formData.getAll("uuid");

    await deleteVariant(envId, flagId, String(uuid), authCookie);

    return { successDelete: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};
