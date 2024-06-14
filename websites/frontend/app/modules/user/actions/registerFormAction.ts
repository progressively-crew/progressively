import { ActionFunction } from "@remix-run/node";
import { RegisterActionData } from "../components/RegisterForm";
import { createUser } from "../services/createUser";
import { User } from "../types";
import { validateRegistrationForm } from "../validators/validate-registration-form";

export const registerAction: ActionFunction = async ({
  request,
}): Promise<RegisterActionData> => {
  const formData = await request.formData();
  const fullname = formData.get("fullname")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  const errors = validateRegistrationForm({
    email,
    password,
    fullname,
    confirmPassword,
  });

  if (
    errors?.fullname ||
    errors?.email ||
    errors?.password ||
    errors?.confirmPassword
  ) {
    return { errors };
  }

  try {
    const newUser: User = await createUser(fullname!, email!, password!);

    return { newUser };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          backend: error.message,
        },
      };
    }

    return { errors: { backend: "An error ocurred" } };
  }
};
