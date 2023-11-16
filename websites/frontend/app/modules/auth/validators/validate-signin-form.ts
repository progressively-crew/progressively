import { validateEmail } from "../../forms/utils/validateEmail";
import { validatePassword } from "../../forms/utils/validatePassword";
import { AuthCredentials } from "../types";

export const validateSigninForm = (values: Partial<AuthCredentials>) => {
  const errors: Partial<AuthCredentials> = {};

  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
