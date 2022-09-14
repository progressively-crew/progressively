import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData, Form, useTransition } from "@remix-run/react";
import { BackLink } from "~/components/BackLink";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import {
  validatePassword,
  validateConfirmationPassword,
} from "~/modules/forms/utils/validatePassword";
import { changePassword } from "~/modules/user/services/changePassword";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Profile",
  };
};

interface ActionData {
  passwordUpdated?: boolean;
  errors?: {
    password?: string;
    confirmationPassword?: string;
    backendError?: string;
  };
}

export const action: ActionFunction = async ({ request }): Promise<ActionData> => {
  const formData = await request.formData();

  const password = formData.get("password")?.toString();
  const confirmationPassword = formData.get("confirmationPassword")?.toString();

  const passwordError = validatePassword(password);
  const confirmationPasswordError = validateConfirmationPassword(confirmationPassword);

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

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  await changePassword(password!, confirmationPassword!, authCookie);

  return { passwordUpdated: true };
};

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  const user = await authGuard(request);

  return { user };
};

export default function ProfilePage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { user } = useLoaderData<LoaderData>();
  const passwordUpdated = data?.passwordUpdated;
  const errors = data?.errors;

  return (
    <DashboardLayout
      user={user}
      header={
        <>
          <nav aria-label="Profile navigation">
            <span>
              <BackLink to="/dashboard">Back to dashboard</BackLink>
            </span>
          </nav>

          <PageTitle value="My profile" />
        </>
      }
      status={
        <>
          {errors && Object.keys(errors).length > 0 && <ErrorBox list={errors} />}

          {passwordUpdated && (
            <SuccessBox id="password-changed">
              The password has been successfully changed.
            </SuccessBox>
          )}
        </>
      }
    >
      <Card>
        <CardContent>
          <Section>
            <SectionHeader title="Change password" />

            <Form method="post">
              <FormGroup>
                <TextInput
                  label="New password"
                  name="password"
                  isInvalid={Boolean(errors?.password)}
                  placeholder="**********"
                  type="password"
                />

                <TextInput
                  label="Confirmation password"
                  name="confirmationPassword"
                  isInvalid={Boolean(errors?.confirmationPassword)}
                  placeholder="**********"
                  type="password"
                />

                <div>
                  <SubmitButton
                    isLoading={transition.state === "submitting"}
                    loadingText="Password changing in progress, please wait..."
                  >
                    Change password
                  </SubmitButton>
                </div>
              </FormGroup>
            </Form>
          </Section>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
