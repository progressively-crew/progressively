import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default () => {
  return {
    input: "src/index.ts",
    output: {
      file: "dist/progressively.min.js",
      format: "iife",
      globals: {
        "css-selector-generator": "CssSelectorGenerator", // The global variable name for the external dependency
      },
    },
    plugins: [resolve(), commonjs(), typescript(), terser()],
  };
};
