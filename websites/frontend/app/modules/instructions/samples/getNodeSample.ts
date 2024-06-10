import { transform } from "../helpers/transform";
import { SampleReturn } from "./types";

export const setupNode = async (clientKey: string): SampleReturn => {
  const installation = `$ pnpm add @progressively/server-side`;
  const rawCode = `import { Progressively } from "@progressively/server-side";

const sdk = Progressively.init({
    // REQUIRED & SECRET: can be found in the project's settings
    secretKey: "******",

    // OPTIONAL: useful for Server Side Rendering with React for example
    clientKey: "${clientKey}",
});

const { data, response } = await sdk.loadFlags();
const flags = data.flags;
      `;

  return { rawCode, html: await transform(rawCode), installation };
};
