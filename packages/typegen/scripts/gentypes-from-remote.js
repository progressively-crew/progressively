#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");

const getRemoteTypes = (clientKey) => {
  return fetch(`http://localhost:4000/sdk/${clientKey}/types`).then((res) =>
    res.text()
  );
};

const genFromRemote = async () => {
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
  const content = await getRemoteTypes("valid-sdk-key");

  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w" });
  console.log("Should be good");
};

genFromRemote();
