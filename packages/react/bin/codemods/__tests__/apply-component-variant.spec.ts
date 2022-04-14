"use strict";

const path = require("path");
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

// Constants
const testName = "apply-component-variant";
const tests = ["ComponentIfReturn"];

const testPath = path.join(__dirname, testName);

tests.forEach((test) => {
  defineTest(__dirname, testName, null, `${testName}/${test}`, {
    parser: "tsx",
  });
});
