/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  rootDir: "app",
  moduleNameMapper: {
    "~/components/(.*)$": "<rootDir>/../../ui-components/src/$1",
    "~/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jsdom",
};
