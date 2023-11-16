import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { OktaConfig } from "~/modules/auth/types";
import { destroySession, getSession } from "~/sessions";

export interface LoaderData {
  oktaConfig: OktaConfig;
}

export const loader: LoaderFunction = async ({ request }) => {
  const oktaConfig = getOktaConfig();
  const session = await getSession(request.headers.get("Cookie"));

  if (!oktaConfig.isOktaActivated) {
    return redirect("/signin", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return json(
    {
      oktaConfig: getOktaConfig(),
    },
    {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    }
  );
};

export default function LogoutPage() {
  const { oktaConfig } = useLoaderData<LoaderData>();
  const okta = useOkta(oktaConfig);

  useEffect(() => {
    const logout = async () => {
      if (oktaConfig.isOktaActivated && okta) {
        const urlToRedirect = await okta.logout();
        window.location.href = urlToRedirect;
      }
    };

    logout();
  }, [okta, oktaConfig.isOktaActivated]);

  return null;
}
