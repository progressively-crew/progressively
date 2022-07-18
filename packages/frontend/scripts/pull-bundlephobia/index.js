// Pull the bundlephobia data concerning @progressively/react
// to display metrics in the homepage
const httpGet = require("./httpGet");
const fs = require("node:fs");
const path = require("node:path");
const getPackageVersion = require("./getPackageVersion");

const packages = [
  "@progressively/react",
  "@flagship.io/react-sdk",
  "@growthbook/growthbook-react",
  // "@unleash/proxy-client-react", Ignoring since bundlephobia tells it lacks a dependency: https://bundlephobia.com/package/@unleash/proxy-client-react@3.1.0
  "launchdarkly-react-client-sdk",
];

const publicFrontendPath = path.join(
  __dirname,
  "..",
  "../",
  "app",
  "progressively-sdk-sizes.json"
);

const load = async () => {
  const jsonPackages = [];

  for (const package of packages) {
    const version = await getPackageVersion(package);
    const { gzip, size } = await httpGet(
      `https://bundlephobia.com/api/size?package=${package}@${version}&record=true`
    );

    jsonPackages.push({ package, version, gzip, size });
  }

  const jsonString = JSON.stringify(jsonPackages);
  fs.writeFileSync(publicFrontendPath, jsonString);

  console.log(
    "\nBundlephobia information regarding the @progressively/react package has been updated"
  );
};

load();
