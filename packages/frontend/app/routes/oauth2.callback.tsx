import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { OktaConfig } from "~/modules/auth/types";
import { commitSession, getSession } from "~/sessions";

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
  const { oktaConfig } = useLoaderData<LoaderData>();
  const okta = useOkta(oktaConfig);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!okta) return;
    const handleLogin = async () => {
      const accessToken = await okta?.setTokensFromUrl();

      if (accessToken) {
        fetcher.submit({ accessToken }, { method: "post" });
      }
    };

    handleLogin();
  }, [okta]);

  return <div className="p-8">You will be redirected in a few moment.</div>;
}
