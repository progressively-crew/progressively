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
import { Link } from "~/components/Link";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials, OktaConfig } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { authenticate } from "../modules/auth/services/authenticate";
import { validateSigninForm } from "../modules/auth/validators/validate-signin-form";
import { Typography } from "~/components/Typography";
import { Button } from "~/components/Buttons/Button";
import { SiOkta } from "react-icons/si";
import { Card, CardContent } from "~/components/Card";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { Stack } from "~/components/Stack";
import { Separator } from "~/components/Separator";
import { Spacer } from "~/components/Spacer";
import { LogoWithoutText } from "~/components/Logo/WithoutText";
import { H1Logo } from "~/components/H1Logo";
import { HStack } from "~/components/HStack";

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
  oktaConfig: OktaConfig;
}

export const loader: LoaderFunction = (): LoaderData => {
  return {
    showRegister: process.env.ALLOW_REGISTRATION === "true",
    oktaConfig: getOktaConfig(),
  };
};

export default function Signin() {
  const { showRegister, oktaConfig } = useLoaderData<LoaderData>();
  const okta = useOkta(oktaConfig);
  const transition = useTransition();
  const [searchParams] = useSearchParams();
  const userActivated = searchParams.get("userActivated");
  const userCreated = searchParams.get("userCreated");
  const oauthFailed = searchParams.get("oauthFailed");
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout
      size="S"
      status={
        oauthFailed ? (
          <ErrorBox
            list={{
              oauth:
                "An error appeared during the authentication. Please try again or contact your system administrator.",
            }}
          />
        ) : errors?.password || errors?.email || errors?.badUser ? (
          <ErrorBox list={errors} />
        ) : userActivated ? (
          <SuccessBox id="user-activated">
            The account has been activated, you can now log in
          </SuccessBox>
        ) : userCreated ? (
          <SuccessBox id="user-created">
            The account has been created, you can now log in
          </SuccessBox>
        ) : null
      }
    >
      <Card>
        <CardContent>
          <div className="flex flex-row justify-between">
            <H1Logo>Signin</H1Logo>

            {showRegister && (
              <Button
                className="justify-center"
                to="/register"
                variant="tertiary"
              >{`Sign up`}</Button>
            )}
          </div>

          <Spacer size={16} />

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

                <div className="pt-1 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-gray-500"
                  >{`I forgot my password`}</Link>
                </div>
              </div>

              <SubmitButton
                className="justify-center"
                isLoading={transition.state === "submitting"}
                loadingText="Signin in progress, please wait..."
              >
                Sign in
              </SubmitButton>
            </FormGroup>
          </Form>

          {oktaConfig.isOktaActivated && (
            <div>
              <Spacer size={12} />
              <Separator />

              <div className="flex justify-center -mt-3">
                <Typography className="text-sm px-3 bg-white">
                  Or signin with
                </Typography>
              </div>

              <Spacer size={4} />
              <Button
                type="button"
                className="justify-center w-full"
                variant="secondary"
                icon={<SiOkta aria-hidden />}
                onClick={okta?.openLoginPage}
              >
                Sign in with Okta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </NotAuthenticatedLayout>
  );
}
