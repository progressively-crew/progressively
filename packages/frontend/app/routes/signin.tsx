import {
  MetaFunction,
  ActionFunction,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import {
  useLoaderData,
  useSearchParams,
  useActionData,
  Form,
  useTransition,
} from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Link } from "~/components/Link";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { authenticate } from "../modules/auth/services/authenticate";
import { validateSigninForm } from "../modules/auth/validators/validate-signin-form";
import { Typography } from "~/components/Typography";
import { HStack } from "~/components/HStack";
import { Button } from "~/components/Buttons/Button";
import { AiOutlineLock } from "react-icons/ai";

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Sign in",
  };
};

interface ActionData {
  errors?: Partial<AuthCredentials & { badUser: string }>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const errors = validateSigninForm({ email, password });

  if (errors?.email || errors?.password) {
    return { errors };
  }

  const res = await authenticate(email!, password!);

  const authenticationSucceed = await res.json();

  if (!authenticationSucceed.access_token || !res.headers.get("set-cookie")) {
    return {
      errors: {
        badUser: "Woops! Looks the credentials are not valid.",
      },
    };
  }

  session.set("auth-cookie", authenticationSucceed.access_token);
  session.set("refresh-token-cookie", res.headers.get("set-cookie"));

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export interface LoaderData {
  showRegister: boolean;
}
export const loader: LoaderFunction = (): LoaderData => {
  return { showRegister: process.env.ALLOW_REGISTRATION === "true" };
};

export default function Signin() {
  const { showRegister } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const [searchParams] = useSearchParams();
  const userActivated = searchParams.get("userActivated");
  const userCreated = searchParams.get("userCreated");
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      header={
        <Header
          title="Signin"
          description={
            showRegister ? (
              <Typography>
                If you {`don't`} have a user account yet, you can{" "}
                <Link
                  to="/register"
                  color="nemesis"
                >{`create an account`}</Link>
                .
              </Typography>
            ) : null
          }
        />
      }
      status={
        <>
          {(errors?.password || errors?.email || errors?.badUser) && (
            <ErrorBox list={errors} />
          )}

          {Boolean(userActivated) && (
            <SuccessBox id="user-activated">
              The account has been activated, you can now log in
            </SuccessBox>
          )}
          {Boolean(userCreated) && (
            <SuccessBox id="user-created">
              The account has been created, you can now log in
            </SuccessBox>
          )}
        </>
      }
    >
      <Form method="post">
        <FormGroup>
          <TextInput
            isInvalid={Boolean(errors?.email)}
            name="email"
            label="Email"
            placeholder="e.g: james.bond@mi6.com"
            autoComplete="username"
          />

          <div>
            <TextInput
              isInvalid={Boolean(errors?.password)}
              name="password"
              label="Password"
              type="password"
              placeholder="************"
              autoComplete="current-password"
            />
          </div>

          <HStack spacing={4}>
            <SubmitButton
              isLoading={transition.state === "submitting"}
              loadingText="Signin in progress, please wait..."
            >
              Sign in
            </SubmitButton>

            <Button
              to="/forgot-password"
              icon={<AiOutlineLock aria-hidden />}
            >{`I forgot my password`}</Button>
          </HStack>
        </FormGroup>
      </Form>
    </NotAuthenticatedLayout>
  );
}
