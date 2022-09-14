import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import {
  RegisterForm,
  registerAction,
  RegisterActionData,
} from "~/modules/user/components/RegisterForm";
import { BackLink } from "~/components/BackLink";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { MetaFunction, ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { PageTitle } from "~/components/PageTitle";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively| Create an account",
  };
};

export const action: ActionFunction = ({ request }): Promise<RegisterActionData> => {
  return registerAction({ request });
};

export const loader: LoaderFunction = () => {
  if (process.env.ALLOW_REGISTRATION === "true") {
    return null;
  }

  return redirect("/signin");
};

export default function CreateAccountPage() {
  const data = useActionData<RegisterActionData>();
  const newUser = data?.newUser;
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      nav={<BackLink to="/signin">Back to signin</BackLink>}
      header={<PageTitle value="Create an account" />}
      status={
        <>
          {errors && Object.keys(errors).length > 0 && <ErrorBox list={errors} />}

          {newUser?.uuid && (
            <SuccessBox id="user-created">
              The user has been created! Take a look at your inbox, there should be a link to
              activate it :).
            </SuccessBox>
          )}
        </>
      }
    >
      <RegisterForm errors={errors} />
    </NotAuthenticatedLayout>
  );
}
