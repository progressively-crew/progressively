import { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { forgotPassword } from "~/modules/user/services/forgotPassword";
import { BackLink } from "~/components/BackLink";

export const meta: MetaFunction = () => {
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
  const navigation = useNavigation();
  const success = data?.success;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
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
      backLink={
        <BackLink colorScheme="dark" to="/signin">
          Back to signin
        </BackLink>
      }
    >
      <div className="motion-safe:animate-fade-enter-top">
        <Typography
          as="h1"
          className="text-3xl font-extrabold pb-2 !leading-tight font-title"
        >
          Password forgotten
        </Typography>

        <Typography className="pb-4">
          Enter your email to get a recovery link and reset your password.
        </Typography>
      </div>

      <div className="w-full">
        <Form method="post">
          <FormGroup>
            <div
              className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <TextInput
                hiddenLabel
                isInvalid={Boolean(errors?.email)}
                label="Email"
                name="email"
                type="email"
                placeholder="e.g: james.bond@mi6.com"
              />
            </div>

            <div
              className="flex flex-col motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
              style={{ animationDelay: "500ms" }}
            >
              <SubmitButton
                isLoading={navigation.state === "submitting"}
                loadingText="Password resetting in progress, please wait..."
              >
                Reset password
              </SubmitButton>
            </div>
          </FormGroup>
        </Form>
      </div>
    </NotAuthenticatedLayout>
  );
}
