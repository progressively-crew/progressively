import type { Config } from "prismic-ts-codegen";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config: Config = {
  repositoryName: "Progressively",
  output: "./types.generated.ts",
  customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
  models: {
    fetchFromRepository: true,
  },
};

export default config;
