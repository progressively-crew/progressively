const path = require("path");
const Runner = require("jscodeshift/src/Runner");

const srcIndex = process.argv.findIndex((x) => x === "--src");

if (srcIndex < 0) {
  throw new Error(
    `[@rollout/react] you have not passed a source folder to format`
  );
}

const srcValue = process.argv[srcIndex + 1] || undefined;
const pathToTransformer = path.join(
  __dirname,
  "codemods",
  "apply-true-variant.js"
);

const options = {
  transform: pathToTransformer,
  verbose: 0,
  dry: false,
  print: true,
  babel: true,
  extensions: "js",
  ignorePattern: [],
  ignoreConfig: [],
  runInBand: false,
  silent: false,
  parser: "babel",
  stdin: false,
};

Runner.run(options.transform, [srcValue], options);
