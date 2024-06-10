import { transform } from "../helpers/transform";
import { SampleReturn } from "./types";

export const setupSdkJs = async (clientKey: string): SampleReturn => {
  const installation = `$ pnpm add @progressively/sdk-js`;
  const rawCode = `import { Progressively } from "@progressively/sdk-js";

const sdk = Progressively.init("${clientKey}");
const { flags } = await sdk.loadFlags();
      `;

  return { rawCode, html: await transform(rawCode), installation };
};
