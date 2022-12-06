import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useOkta } from "~/modules/auth/hooks/useOkta";
import { getOktaConfig } from "~/modules/auth/services/get-okta-config";
import { OktaConfig } from "~/modules/auth/types";

export interface LoaderData {
  oktaConfig: OktaConfig;
}

export const loader: LoaderFunction = (): LoaderData => {
  return {
    oktaConfig: getOktaConfig(),
  };
};

export default function OauthCallback() {
  const navigate = useNavigate();
  const { oktaConfig } = useLoaderData<LoaderData>();
  const okta = useOkta(oktaConfig);

  useEffect(() => {
    (async () => {
      await okta?.setTokensFromUrl();
      navigate("/signin");
    })();
  }, [navigate, okta]);

  return null;
}
