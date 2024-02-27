import {
  ActionFunction,
  redirect,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  useLoaderData,
  useSearchParams,
  useActionData,
  Form,
  useNavigation,
} from "@remix-run/react";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Link } from "~/components/Link";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { AuthCredentials } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { authenticate } from "../modules/auth/services/authenticate";
import { validateSigninForm } from "../modules/auth/validators/validate-signin-form";
import { Button } from "~/components/Buttons/Button";
import { SiOkta } from "react-icons/si";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { Typography } from "~/components/Typography";
import { getProjects } from "~/modules/projects/services/getProjects";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Progressively | Sign in",
    },
  ];
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

  if (
    !authenticationSucceed.access_token ||
    !authenticationSucceed.refresh_token
  ) {
    return {
      errors: {
        badUser: "Woops! Looks the credentials are not valid.",
      },
    };
  }

  session.set("auth-cookie", authenticationSucceed.access_token);
  session.set("refresh-token", authenticationSucceed.refresh_token);

  // If only one project, redirect to it
  const projects = await getProjects(authenticationSucceed.access_token);

  let url = "";

  if (projects?.length === 1) {
    url += `/dashboard/projects/${projects[0].projectId}/flags/all`;
  } else {
    url = "/dashboard/projects/all";
  }

  return redirect(url, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const loader: LoaderFunction = () => {
  return {
    isDemoInstance: process.env.IS_DEMO_INSTANCE === "true",
    showRegister: process.env.ALLOW_REGISTRATION === "true",
    oktaConfig: getOktaConfig(),
  };
};

export default function Signin() {
  const { showRegister, oktaConfig, isDemoInstance } =
    useLoaderData<typeof loader>();
  const okta = useOkta(oktaConfig);
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const userActivated = searchParams.get("userActivated");
  const userCreated = searchParams.get("userCreated");
  const oauthFailed = searchParams.get("oauthFailed");
  const data = useActionData<ActionData>();
  const errors = data?.errors;

  const status = oauthFailed ? (
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
  ) : null;

  return (
    <NotAuthenticatedLayout status={status}>
      <Typography
        as="h1"
        className="text-center text-3xl font-extrabold !leading-tight motion-safe:animate-fade-enter-top pb-8 font-title"
      >
        Signin to your account
      </Typography>

      <Form method="post" className="w-full">
        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{ animationDelay: "300ms" }}
        >
          <TextInput
            isInvalid={Boolean(errors?.email)}
            name="email"
            label="Email"
            placeholder="e.g: james.bond@mi6.com"
            autoComplete="username"
            defaultValue={isDemoInstance ? "demo@progressively.app" : undefined}
          />
        </div>

        <div className="pt-4">
          <div
            className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
            style={{ animationDelay: "500ms" }}
          >
            <TextInput
              isInvalid={Boolean(errors?.password)}
              name="password"
              label="Password"
              type="password"
              placeholder="************"
              autoComplete="current-password"
              defaultValue={
                isDemoInstance ? "demo@progressively.app" : undefined
              }
            />
          </div>

          <div
            className="pt-1 flex justify-end motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
            style={{ animationDelay: "700ms" }}
          >
            <Link
              to="/forgot-password"
              className="text-xs text-gray-500"
            >{`I forgot my password`}</Link>
          </div>
        </div>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0 pt-4 flex flex-col gap-2"
          style={{ animationDelay: "900ms" }}
        >
          {oktaConfig.isOktaActivated && (
            <Button
              type="button"
              variant="secondary"
              icon={<SiOkta aria-hidden />}
              onClick={okta?.openLoginPage}
            >
              Sign in with Okta
            </Button>
          )}
          <Button
            variant="primary"
            isLoading={navigation.state === "submitting"}
            loadingText="Signin in progress, please wait..."
          >
            Sign in
          </Button>

          {showRegister && (
            <Button to="/register" variant="tertiary">
              Sign up
            </Button>
          )}
        </div>
      </Form>
    </NotAuthenticatedLayout>
  );
}
