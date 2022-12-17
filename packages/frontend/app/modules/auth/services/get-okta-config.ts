import { Constants } from "~/constants";
import { OktaConfig } from "../types";

export const getOktaConfig = () => {
  const oktaConfig: OktaConfig = {
    issuer: String(Constants.OktaIssuer),
    clientId: String(Constants.OktaClientId),
    isOktaActivated: Boolean(Constants.OktaIssuer && Constants.OktaClientId),
  };

  return oktaConfig;
};
