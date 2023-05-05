import { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Section, SectionHeader } from "~/components/Section";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import {
  validatePassword,
  validateConfirmationPassword,
} from "~/modules/forms/utils/validatePassword";
import { changePassword } from "~/modules/user/services/changePassword";
import { getSession } from "~/sessions";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { UserMenu } from "~/modules/user/components/UserMenu";
import { Typography } from "~/components/Typography";
import { Button } from "~/components/Buttons/Button";
import { Spacer } from "~/components/Spacer";
import { ThemeSwitch } from "~/components/ThemeSwitch";
import { useUser } from "~/modules/user/contexts/useUser";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile",
    },
  ];
};

interface ActionData {
  passwordUpdated?: boolean;
  errors?: {
    password?: string;
    confirmationPassword?: string;
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const formData = await request.formData();

  const password = formData.get("password")?.toString();
  const confirmationPassword = formData.get("confirmationPassword")?.toString();

  const passwordError = validatePassword(password);
  const confirmationPasswordError =
    validateConfirmationPassword(confirmationPassword);

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

export default function ProfilePage() {
  const transition = useTransition();
  const data = useActionData<ActionData>();
  const { user } = useUser();

  const passwordUpdated = data?.passwordUpdated;
  const errors = data?.errors;

  return (
    <DashboardLayout
      user={user}
      subNav={<UserMenu />}
      status={
        errors && Object.keys(errors).length > 0 ? (
          <ErrorBox list={errors} />
        ) : passwordUpdated ? (
          <SuccessBox id="password-changed">
            The password has been successfully changed.
          </SuccessBox>
        ) : null
      }
    >
      <div className="h-8">
        <ThemeSwitch />
      </div>

      <PageTitle value="My profile" />

      <Section id="change-password">
        <Card>
          <CardContent>
            <SectionHeader title="Change password" name="password" />

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
                    variant="secondary"
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
      </Section>

      <Section id="logout">
        <Card>
          <CardContent>
            <SectionHeader
              title="Logout"
              name="logout"
              description={
                <Typography>
                  Click the following link to disconnect from the application
                  and to get back to the sign in page.
                </Typography>
              }
            />

            <Spacer size={4} />
            <div className="inline-block">
              <Button variant="secondary" to="/logout">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
