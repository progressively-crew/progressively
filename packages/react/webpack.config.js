const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    globalObject: "this",
    library: {
      name: "@rollout/react",
      type: "umd",
    },
  },
  externals: {
    react: "react",
  },
  plugins:
    process.env.NODE_ENV === "development"
      ? [new BundleAnalyzerPlugin()]
      : undefined,
};
