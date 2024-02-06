import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { OktaConfig } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";
import { Typography } from "~/components/Typography";
import { Spinner } from "~/components/Spinner";
import { HStack } from "~/components/HStack";

export interface LoaderData {
  oktaConfig: OktaConfig;
}

export const loader: LoaderFunction = (): LoaderData => {
  return {
    oktaConfig: getOktaConfig(),
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const accessToken = formData.get("accessToken");

  session.set("auth-cookie", accessToken);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function OauthCallback() {
  const navigate = useNavigate();
  const { oktaConfig } = useLoaderData<LoaderData>();
  const okta = useOkta(oktaConfig);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!okta) return;
    const handleLogin = async () => {
      try {
        const accessToken = await okta?.setTokensFromUrl();

        if (accessToken) {
          fetcher.submit({ accessToken }, { method: "post" });
        }
      } catch {
        navigate("/signin?oauthFailed=true");
      }
    };

    handleLogin();
  }, [okta, navigate]);

  return (
    <main className="p-8">
      <HStack spacing={4}>
        <div className="text-gray-600">
          <Spinner />
        </div>
        <div>
          <Typography as="h1" className="font-bold text-lg">
            Authentication in progress...
          </Typography>
          <Typography>
            It shouldnt be too long, {`you'll`} be soon redirected to the
            dashbaord.
          </Typography>
        </div>
      </HStack>
    </main>
  );
}
