import { transform } from "../helpers/transform";
import { SampleReturn } from "./types";

export const setupFeatureFlagSample = async (): SampleReturn => {
  const installation = "$ pnpm add @progressively/react";
  const rawCode = `import { useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.myFlagKey) {
    return <div>New page!</div>;
  }

  return <div>Old page</div>;
};
  `;

  return { rawCode, html: await transform(rawCode), installation };
};

export const setupProviderSample = async (clientKey: string): SampleReturn => {
  const installation = "$ pnpm add @progressively/react";
  const rawCode = `import { ProgressivelyProvider } from "@progressively/react";

const YourApp = () => {
  return (
    <ProgressivelyProvider clientKey="${clientKey}">
      <YourComponent />
    </ProgressivelyProvider>
  );
};`;

  return { rawCode, html: await transform(rawCode), installation };
};
