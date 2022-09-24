import { Params } from "@remix-run/react";
import { editVariant } from "../services/editVariant";
import { Variant } from "../types";

export const editVariantAction = async (
  formData: FormData,
  params: Params<string>,
  authCookie: string
) => {
  const flagId = String(params.flagId);
  const envId = String(params.env);

  const uuids = formData.getAll("uuid");
  const names = formData.getAll("name");
  const rolloutPercentages = formData.getAll("rolloutPercentage");
  const controlId = formData.get("isControl");
  const errors: Record<string, string> = {};

  for (const [index, name] of names.entries()) {
    if (!name) {
      errors[`name-${index}`] = `The variant value on line ${index + 1} is invalid.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const variants = uuids.map((uuid, index: number) => {
      const id = uuid.toString();
      const variant: Variant = {
        uuid: id,
        value: names[index].toString(),
        rolloutPercentage: Number(rolloutPercentages[index]),
        isControl: controlId === id,
      };

      return variant;
    });

    await editVariant(envId, flagId, variants, authCookie);

    return { successEdit: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};
