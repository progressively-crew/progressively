import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const external = ["react"];
const globals = { react: "react" };

export default () => {
  return {
    input: "src/index.tsx",
    output: [
      {
        file: "lib/cjs/index.cjs.js",
        format: "cjs",
        name: "progressively-react",
        globals,
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
    external,
  };
};
