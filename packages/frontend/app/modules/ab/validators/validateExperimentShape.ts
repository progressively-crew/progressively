import { CreateExperimentDTO } from "../types";

export const validateExperimentShape = (values: CreateExperimentDTO) => {
  const errors: Partial<CreateExperimentDTO> = {};

  if (!values.name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  if (!values.description) {
    errors.description =
      "The description field is required, make sure to have one.";
  }

  return errors;
};
