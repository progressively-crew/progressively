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
  serverBuildTarget: process.env.IS_VERCEL === "true" ? "vercel" : undefined,
  server: process.env.IS_VERCEL === "true" ? "./server.js" : undefined,
  // end of vercel specific
};
