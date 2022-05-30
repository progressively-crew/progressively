import {
  ActionFunction,
  Form,
  MetaFunction,
  useActionData,
  useSearchParams,
  useTransition,
} from "remix";
import { BackLink } from "~/components/BackLink";
import { Button } from "~/components/Buttons/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { SuccessBox } from "~/components/SuccessBox";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  validateConfirmationPassword,
  validatePassword,
} from "~/modules/forms/utils/validatePassword";
import { resetPassword } from "~/modules/user/services/resetPassword";

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
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          backendError: err.message,
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
  const success = data?.success;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      header={<Header title="Reset password" />}
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
      <Form method="post">
        <input type="hidden" name="token" id="token" value={urlToken || ""} />

        <FormGroup>
          <TextInput
            isInvalid={Boolean(errors?.password)}
            label="New password"
            name="password"
            placeholder="**********"
          />

          <TextInput
            isInvalid={Boolean(errors?.confirmationPassword)}
            label="Confirmation password"
            name="confirmationPassword"
            placeholder="**********"
          />

          <Button
            fullWidth
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Password changing in progress, please wait..."
          >
            Change password
          </Button>
        </FormGroup>
      </Form>
    </NotAuthenticatedLayout>
  );
}
