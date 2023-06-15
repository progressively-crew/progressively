#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");

const restoreTypes = async () => {
  const filePath = path.join(
    process.cwd(),
    "node_modules",
    "@types",
    "@progressively",
    "index.d.ts"
  );

  fs.unlinkSync(filePath);
};

restoreTypes();
