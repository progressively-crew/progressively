/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  rootDir: "app",
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jsdom",
};
