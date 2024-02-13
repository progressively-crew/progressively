import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default () => {
  return {
    input: "src/index.ts",
    output: {
      file: "dist/progressively.min.js",
      format: "iife",
    },

    plugins: [typescript(), terser()],
  };
};
