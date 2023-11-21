import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Typography } from "~/components/Typography";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import {
  registerAction,
  RegisterForm,
} from "~/modules/user/components/RegisterForm";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Welcome",
    },
  ];
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
      status={
        errors && Object.keys(errors).length > 0 && <ErrorBox list={errors} />
      }
    >
      <Typography
        as="h1"
        className="text-3xl font-extrabold !leading-tight pb-2"
      >
        Congratulations
      </Typography>

      <Typography className="text-center pb-8">
        {`You've`} successfully run your Progressively instance. {`It's`} time
        to create <strong>your admin user.</strong>
      </Typography>

      <div className="w-full">
        <RegisterForm errors={errors} actionLabel="Create my admin user" />
      </div>
    </NotAuthenticatedLayout>
  );
}
