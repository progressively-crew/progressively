import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  RegisterForm,
  RegisterActionData,
} from "~/modules/user/components/RegisterForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { ActionFunction, MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Typography } from "~/components/Typography";
import { BackLink } from "~/components/BackLink";
import { registerAction } from "~/modules/user/actions/registerFormAction";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Progressively| Sign up",
    },
  ];
};

export const action: ActionFunction = async ({ request }): Promise<any> => {
  return await registerAction({ request });
};

export default function CreateAccountPage() {
  const data = useActionData<RegisterActionData>();
  const newUser = data?.newUser;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      status={
        errors && Object.keys(errors).length > 0 ? (
          <ErrorBox list={errors} />
        ) : newUser?.uuid ? (
          <SuccessBox id="user-created">
            The user has been created! Take a look at your inbox, there should
            be a link to activate it :).
          </SuccessBox>
        ) : null
      }
      backLink={
        <BackLink colorScheme="dark" to="/signin">
          Back to signin
        </BackLink>
      }
    >
      <Typography
        as="h1"
        className="text-center text-3xl font-extrabold !leading-tight motion-safe:animate-fade-enter-top pb-8 font-title"
      >
        Create an account
      </Typography>

      <div className="w-full">
        <RegisterForm errors={errors} />
      </div>
    </NotAuthenticatedLayout>
  );
}
