/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["react"] = path.dirname(
      require.resolve("./node_modules/react")
    );
    // config.resolve.alias["@rollout/react"] = path.dirname(
    //   require.resolve("../../packages/@rollout/react")
    // );

    return config;
  },
};
