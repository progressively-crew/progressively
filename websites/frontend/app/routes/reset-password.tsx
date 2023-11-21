import { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import {
  useActionData,
  useSearchParams,
  Form,
  useNavigation,
} from "@remix-run/react";
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
import { BackLink } from "~/components/BackLink";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Reset password",
    },
  ];
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
  const navigation = useNavigation();
  const urlToken = searchParams.get("token");
  const pageType = searchParams.get("p");
  const success = data?.success;
  const errors = data?.errors;

  const pageTitle = pageType === "s" ? "Set your password" : "Reset password";

  return (
    <NotAuthenticatedLayout
      status={
        errors && Object.keys(errors).length > 0 ? (
          <ErrorBox list={errors} />
        ) : success ? (
          <SuccessBox id="password-reset">
            The password has been successfully reset. You can now connect.
          </SuccessBox>
        ) : null
      }
      backLink={<BackLink to="/signin">Back to signin</BackLink>}
    >
      <Typography
        as="h1"
        className="text-center text-3xl font-extrabold !leading-tight pb-8"
      >
        {pageTitle}
      </Typography>

      <div className="w-full">
        <Form method="post">
          <input type="hidden" name="token" id="token" value={urlToken || ""} />

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

            <SubmitButton
              isLoading={navigation.state === "submitting"}
              loadingText="Password changing in progress, please wait..."
            >
              Change password
            </SubmitButton>
          </FormGroup>
        </Form>
      </div>
    </NotAuthenticatedLayout>
  );
}
