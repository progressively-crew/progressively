import { MetaFunction, ActionFunction } from "@remix-run/node";
import {
  useActionData,
  useSearchParams,
  Form,
  useTransition,
} from "@remix-run/react";
import { BackLink } from "~/components/BackLink";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  validateConfirmationPassword,
  validatePassword,
} from "~/modules/forms/utils/validatePassword";
import { resetPassword } from "~/modules/user/services/resetPassword";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { H1Logo } from "~/components/H1Logo";
import { Spacer } from "~/components/Spacer";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Reset password",
  };
};

interface ActionData {
  success?: boolean;
  errors?: {
    password?: string;
    confirmationPassword?: string;
    token?: string;
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  const password = formData.get("password")?.toString();
  const confirmationPassword = formData.get("confirmationPassword")?.toString();

  const passwordError = validatePassword(password);
  const confirmationPasswordError =
    validateConfirmationPassword(confirmationPassword);

  if (!token) {
    return {
      errors: {
        token: "The token is missing",
      },
    };
  }

  if (passwordError || confirmationPasswordError) {
    return {
      errors: {
        password: passwordError,
        confirmationPassword: confirmationPasswordError,
      },
    };
  }

  if (password !== confirmationPassword) {
    return {
      errors: {
        password: "The two passwords are not the same.",
      },
    };
  }

  try {
    await resetPassword(password!, token);

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

export default function ResetPasswordPage() {
  const data = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  const urlToken = searchParams.get("token");
  const pageType = searchParams.get("p");
  const success = data?.success;
  const errors = data?.errors;

  const pageTitle = pageType === "s" ? "Set your password" : "Reset password";

  return (
    <NotAuthenticatedLayout
      size="S"
      nav={<BackLink to="/signin">Back to signin</BackLink>}
      status={
        <>
          {errors && Object.keys(errors).length > 0 && (
            <ErrorBox list={errors} />
          )}

          {success && (
            <SuccessBox id="password-reset">
              The password has been successfully reset. You can now connect.
            </SuccessBox>
          )}
        </>
      }
    >
      <Card>
        <CardContent>
          <H1Logo>{pageTitle}</H1Logo>
          <Spacer size={16} />
          <Form method="post">
            <input
              type="hidden"
              name="token"
              id="token"
              value={urlToken || ""}
            />

            <FormGroup>
              <TextInput
                isInvalid={Boolean(errors?.password)}
                label="New password"
                name="password"
                placeholder="**********"
                type="password"
              />

              <TextInput
                isInvalid={Boolean(errors?.confirmationPassword)}
                label="Confirmation password"
                name="confirmationPassword"
                placeholder="**********"
                type="password"
              />

              <div>
                <SubmitButton
                  className="justify-center w-full"
                  isLoading={transition.state === "submitting"}
                  loadingText="Password changing in progress, please wait..."
                >
                  Change password
                </SubmitButton>
              </div>
            </FormGroup>
          </Form>
        </CardContent>
      </Card>
    </NotAuthenticatedLayout>
  );
}
