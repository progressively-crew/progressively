import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default () => {
  return {
    input: "src/index.tsx",
    output: [
      {
        file: "lib/cjs/index.cjs.js",
        format: "cjs",
        name: "progressively-react",
      },
      {
        file: "lib/esm/index.mjs",
        format: "es",
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
    ],
  };
};
