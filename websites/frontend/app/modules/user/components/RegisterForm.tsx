import { ActionFunction } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { createUser } from "../services/createUser";
import { RegisterCredentials, User } from "../types";
import { validateRegistrationForm } from "../validators/validate-registration-form";

export interface RegisterFormProps {
  errors?: Partial<RegisterCredentials & { backend?: string }>;
  actionLabel?: string;
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

export const RegisterForm = ({ errors, actionLabel }: RegisterFormProps) => {
  const navigation = useNavigation();

  return (
    <Form method="post">
      <FormGroup>
        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{ animationDelay: "300ms" }}
        >
          <TextInput
            isInvalid={Boolean(errors?.fullname)}
            label="Fullname"
            name="fullname"
            placeholder="e.g: James Bond"
          />
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{ animationDelay: "500ms" }}
        >
          <TextInput
            isInvalid={Boolean(errors?.email)}
            label="Email"
            name="email"
            placeholder="e.g: james.bond@mi6.com"
          />
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{ animationDelay: "700ms" }}
        >
          <TextInput
            isInvalid={Boolean(errors?.password)}
            label="Password"
            name="password"
            type="password"
            placeholder="************"
          />
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{ animationDelay: "900ms" }}
        >
          <TextInput
            isInvalid={Boolean(errors?.confirmPassword)}
            label="Confirm your password"
            name="confirmPassword"
            type="password"
            placeholder="************"
          />
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0 w-full [&>*]:w-full"
          style={{ animationDelay: "1100ms" }}
        >
          <SubmitButton
            isLoading={navigation.state === "submitting"}
            loadingText="Creation in progress, please wait..."
          >
            {actionLabel || "Sign up"}
          </SubmitButton>
        </div>
      </FormGroup>
    </Form>
  );
};
