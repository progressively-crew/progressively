/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  devServerPort: 8002,

  // vercel specific
  serverBuildTarget: "vercel",
  server:
    process.env.NODE_ENV === "development" || process.env.IS_TESTING_ENV === "true"
      ? undefined
      : "./server.js",
  // end of vercel specific
};
