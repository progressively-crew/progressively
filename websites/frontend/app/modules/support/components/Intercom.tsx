import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = "lnfovtpj";

export const Intercom = () => {
  return <IntercomProvider appId={INTERCOM_APP_ID} autoBoot></IntercomProvider>;
};
