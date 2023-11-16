import { validateEmail } from "../../forms/utils/validateEmail";
import { validatePassword } from "../../forms/utils/validatePassword";
import { RegisterCredentials } from "../types";

export const validateRegistrationForm = (
  values: Partial<RegisterCredentials>
) => {
  const errors: Partial<RegisterCredentials> = {};

  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);

  if (!values.fullname) {
    errors.fullname = "The fullname field is required.";
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "The confirm password field is required.";
  } else if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = "The two passwords are not the same.";
  }

  return errors;
};
