import { transform } from "../helpers/transform";

export const getReactSample = () =>
  transform(
    `import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.myFlagKey) {
    return <div>New page!</div>;
  }

  return <div>Old page</div>;
};

const progressivelyProps = {
  clientKey: "YOUR_ENVIRONMENT_CLIENT_KEY",
  apiUrl: "your url server", // These options are only necessary when self hosting
  websocketUrl: "your url server for websockets", // These options are only necessary when self hosting
};

const YourPage = () => {
  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};
    `
  );
