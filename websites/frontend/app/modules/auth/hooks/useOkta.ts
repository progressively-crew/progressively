import { useEffect, useState } from "react";
import { OktaserviceClientSide } from "../services/okta";
import { OktaConfig } from "../types";

export const useOkta = (oktaConfig: OktaConfig) => {
  const [okta, setOkta] = useState<ReturnType<typeof OktaserviceClientSide>>();

  useEffect(() => {
    const oktaSrv = OktaserviceClientSide(oktaConfig);
    setOkta(oktaSrv);
  }, []);

  return okta;
};
