import { ActionFunction, Form, useActionData, useTransition } from "remix";
import { Button } from "~/components/Buttons/Button";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { createUser } from "../services/createUser";
import { RegisterCredentials, User } from "../types";
import { validateRegistrationForm } from "../validators/validate-registration-form";

export interface RegisterFormProps {
  errors?: Partial<RegisterCredentials & { backend?: string }>;
}

export interface RegisterActionData extends RegisterFormProps {
  newUser?: User;
}

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
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          backend: err.message,
        },
      };
    }

    return { errors: { backend: "An error ocurred" } };
  }
};

export const RegisterForm = ({ errors }: RegisterFormProps) => {
  const transition = useTransition();

  return (
    <Form method="post">
      <FormGroup>
        <TextInput
          isInvalid={Boolean(errors?.fullname)}
          label="Fullname"
          name="fullname"
          placeholder="e.g: James Bond"
        />

        <TextInput
          isInvalid={Boolean(errors?.email)}
          label="Email"
          name="email"
          placeholder="e.g: james.bond@mi6.com"
        />

        <TextInput
          isInvalid={Boolean(errors?.password)}
          label="Password"
          name="password"
          type="password"
          placeholder="************"
        />

        <TextInput
          isInvalid={Boolean(errors?.confirmPassword)}
          label="Confirm your password"
          name="confirmPassword"
          type="password"
          placeholder="************"
        />

        <Button
          isLoading={transition.state === "submitting"}
          loadingText="Creation in progress, please wait..."
        >
          Create an account
        </Button>
      </FormGroup>
    </Form>
  );
};
