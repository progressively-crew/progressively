const httpGet = require("./httpGet");

const getPackageVersion = async (packageName) => {
  const data = await httpGet(`https://registry.npmjs.org/${packageName}`);
  const latest = data["dist-tags"].latest;

  return latest;
};

module.exports = getPackageVersion;
