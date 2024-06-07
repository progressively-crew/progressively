import { transform } from "../helpers/transform";

export const setupFeatureFlagSample = async () => {
  const rawCode = `import { useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.myFlagKey) {
    return <div>New page!</div>;
  }

  return <div>Old page</div>;
};
  `;

  return { rawCode, html: await transform(rawCode) };
};

export const setupProviderSample = async (clientKey: string) => {
  const rawCode = `import { ProgressivelyProvider } from "@progressively/react";

const YourApp = () => {
  return (
    <ProgressivelyProvider clientKey="${clientKey}">
      <YourComponent />
    </ProgressivelyProvider>
  );
};`;

  return { rawCode, html: await transform(rawCode) };
};
