import { OktaConfig } from "../types";

export const getOktaConfig = () => {
  const oktaConfig: OktaConfig = {
    issuer: String(process.env.OKTA_ISSUER),
    clientId: String(process.env.OKTA_CLIENT_ID),
    isOktaActivated: Boolean(
      process.env.OKTA_ISSUER && process.env.OKTA_CLIENT_ID
    ),
  };

  return oktaConfig;
};
