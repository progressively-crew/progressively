import { CreateEnvironmentDTO } from "../types";

export const validateEnvName = (values: CreateEnvironmentDTO) => {
  const errors: Partial<CreateEnvironmentDTO> = {};

  if (!values.name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  return errors;
};
