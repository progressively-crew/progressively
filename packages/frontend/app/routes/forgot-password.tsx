import { V2_MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { forgotPassword } from "~/modules/user/services/forgotPassword";
import { H1Logo } from "~/components/H1Logo";
import { Button } from "~/components/Buttons/Button";
import { Spacer } from "~/components/Spacer";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Password forgotten",
    },
  ];
};

interface ActionData {
  success?: boolean;
  errors?: { email?: string; backendError?: string };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  const emailError = validateEmail(email);

  if (emailError) {
    return {
      errors: {
        email: emailError,
      },
    };
  }

  try {
    await forgotPassword(email!);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          backendError: error.message,
        },
      };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function ForgotPasswordPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const success = data?.success;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      size="S"
      action={
        <Button
          to="/signin"
          variant="secondary-inverse"
          className="w-full"
        >{`Sign in`}</Button>
      }
      status={
        errors && Object.keys(errors).length > 0 ? (
          <ErrorBox list={errors} />
        ) : success ? (
          <SuccessBox id="password-reset">
            An email with a link to reset your password has been set. Make sure
            to follow the instructions.
          </SuccessBox>
        ) : null
      }
    >
      <H1Logo>Password forgotten</H1Logo>
      <Spacer size={2} />

      <Typography className="text-center">
        Enter your email to get a recovery link and reset your password.
      </Typography>

      <Form method="post">
        <FormGroup>
          <TextInput
            hiddenLabel
            isInvalid={Boolean(errors?.email)}
            label="Email"
            name="email"
            type="email"
            placeholder="e.g: james.bond@mi6.com"
          />

          <SubmitButton
            isLoading={transition.state === "submitting"}
            loadingText="Password resetting in progress, please wait..."
          >
            Reset password
          </SubmitButton>
        </FormGroup>
      </Form>
    </NotAuthenticatedLayout>
  );
}
