// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const monorepoPackages = {
  blocks: path.resolve(workspaceRoot, "packages/react-native"),
};

config.watchFolders = [__dirname, ...Object.values(monorepoPackages)];

config.resolver.extraNodeModules = monorepoPackages;

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;
