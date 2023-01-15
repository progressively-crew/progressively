/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */

const vercelSpecificConfig =
  process.env.IS_VERCEL === "true"
    ? {
        serverBuildTarget: "vercel",
        server: "./server.js",
      }
    : {};

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  devServerPort: 8002,
  ...vercelSpecificConfig,
};
