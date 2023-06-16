#!/usr/bin/env node

require("dotenv").config();

const path = require("node:path");
const fs = require("node:fs");

const getRemoteTypes = (clientKey) => {
  const endpoint =
    process.env.PROGRESSIVELY_API || "https://api.progressively.app";

  return fetch(`${endpoint}/sdk/${clientKey}/types`).then((res) => res.text());
};

const genFromRemote = async () => {
  const envKey = process.env.PROGRESSIVELY_ENV;

  if (!envKey) {
    throw new Error(
      `"process.env.PROGRESSIVELY_ENV" is not set. Make sure to set PROGRESSIVELY_ENV environment variable in order to fetch the type definitions.`
    );
  }

  const directory = path.join(
    process.cwd(),
    "node_modules",
    "@types",
    "@progressively"
  );

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const filePath = path.join(directory, "index.d.ts");
  const content = await getRemoteTypes(envKey);

  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w" });
  console.log("\nTypes generated!\n");
};

genFromRemote();
