const path = require("path");

module.exports = {
  stories: [
    "../app/components/stories/**/*.stories.mdx",
    "../app/components/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "../app");
    return config;
  },
};
