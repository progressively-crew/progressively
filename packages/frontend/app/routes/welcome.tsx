import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Header } from "~/components/Header";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import {
  registerAction,
  RegisterForm,
} from "~/modules/user/components/RegisterForm";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Welcome",
  };
};

interface ActionData {
  errors?: Partial<AuthCredentials & { badUser: string }>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const data: ActionData = await registerAction({ request });

  if (data?.errors) {
    return data;
  }

  return redirect("/signin?userCreated=true");
};

export default function WelcomePage() {
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      header={
        <Header
          title="Congratulations!"
          description={
            <Typography>
              {`You've`} successfully run your Progressively instance. {`It's`}{" "}
              time to create <strong>your admin user.</strong>
            </Typography>
          }
        />
      }
      status={
        errors && Object.keys(errors).length > 0 && <ErrorBox list={errors} />
      }
    >
      <RegisterForm errors={errors} />
    </NotAuthenticatedLayout>
  );
}
