import { CreateFlagDTO } from "./types";

export const validateFlagShape = (values: CreateFlagDTO) => {
  const errors: Partial<CreateFlagDTO> = {};

  if (!values.name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  if (!values.description) {
    errors.description =
      "The description field is required, make sure to have one.";
  }

  return errors;
};
