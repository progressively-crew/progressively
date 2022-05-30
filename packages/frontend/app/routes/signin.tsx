import {
  Form,
  useActionData,
  useTransition,
  ActionFunction,
  redirect,
  MetaFunction,
  useSearchParams,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { Button } from "~/components/Buttons/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Link } from "~/components/Link";
import { Stack } from "~/components/Stack";
import { SuccessBox } from "~/components/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { styled } from "~/stitches.config";
import { authenticate } from "../modules/auth/services/authenticate";
import { validateSigninForm } from "../modules/auth/validators/validate-signin-form";

const ForgotPasswordLink = styled(Link, {
  fontSize: "$btn",
  color: "$hover",
});

const SignupLink = styled(Link, {
  fontSize: "$btn",
  color: "$hover",
  textAlign: "center",
  padding: "$spacing$4 0",
  borderTop: "1px solid $background",
  display: "block",
});

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
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      header={<Header title="Signin" />}
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
          />

          <Stack spacing={2}>
            <div>
              <TextInput
                isInvalid={Boolean(errors?.password)}
                name="password"
                label="Password"
                type="password"
                placeholder="************"
              />
            </div>
            <div>
              <ForgotPasswordLink to="/forgot-password">{`I forgot my password`}</ForgotPasswordLink>
            </div>
          </Stack>

          <Button
            fullWidth
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Signin in progress, please wait..."
          >
            Sign in
          </Button>
        </FormGroup>
      </Form>

      {showRegister ? (
        <SignupLink to="/register">{`Create an account`}</SignupLink>
      ) : null}
    </NotAuthenticatedLayout>
  );
}
