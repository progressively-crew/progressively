module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleNameMapper: {
    "@progressively/sdk-js":
      "<rootDir>/../node_modules/@progressively/sdk-js/dist/legacy/index.js",
  },
};
