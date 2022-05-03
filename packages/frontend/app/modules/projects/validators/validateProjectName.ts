import { CreateProjectDTO } from "../types";

export const validateProjectName = (values: CreateProjectDTO) => {
  const errors: Partial<CreateProjectDTO> = {};

  if (!values.name) {
    errors.name = "The name field is required, make sure to have one.";
  }

  return errors;
};
