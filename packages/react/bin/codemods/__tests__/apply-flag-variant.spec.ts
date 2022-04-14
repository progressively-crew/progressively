"use strict";

const path = require("path");
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

// Constants
const testName = "apply-flag-variant";
const tests = ["HooksIfReturn", "HooksNotIfReturn"];

const testPath = path.join(__dirname, testName);

tests.forEach((test) => {
  defineTest(__dirname, testName, null, `${testName}/${test}`, {
    parser: "tsx",
  });
});

// defineTest(__dirname, 'clear', null, 'typescript/codemod-component', {
//   parser: 'ts',
// });
