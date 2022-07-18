import { FlagProvider, useFlag } from "@unleash/proxy-client-react";

const config = {
  url: "https://HOSTNAME/api/proxy",
  clientKey: "PROXYKEY",
  refreshInterval: 15,
  appName: "your-app-name",
  environment: "dev",
};

const FlaggedComponent = () => {
  const enabled = useFlag("new.homepage");

  if (enabled) return <p>New homepage</p>;
  return <p>Old homepage</p>;
};

function Unleash() {
  return (
    <FlagProvider config={config}>
      <FlaggedComponent />
    </FlagProvider>
  );
}

export default Unleash;
