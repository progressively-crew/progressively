import { CreateVariantDTO } from "../types";

export const validateVariationShape = (values: CreateVariantDTO) => {
  const errors: Partial<CreateVariantDTO> = {};

  if (!values.name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  if (!values.description) {
    errors.description =
      "The description field is required, make sure to have one.";
  }

  return errors;
};
