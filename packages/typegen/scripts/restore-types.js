#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");

const restoreTypes = async () => {
  const dirPath = path.join(
    process.cwd(),
    "node_modules",
    "@types",
    "@progressively"
  );

  fs.rmSync(dirPath, { recursive: true, force: true });
};

restoreTypes();
