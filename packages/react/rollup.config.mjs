import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const external = ["react"];
const globals = { react: "react" };

export default () => {
  const legacy = {
    input: "src/index.tsx",
    output: {
      name: "progressively-react",
      dir: "lib/legacy",
      format: "umd",
      globals,
    },
    plugins: [
      nodeResolve(),
      typescript({
        outDir: "lib/legacy",
        target: "es5",
        exclude: ["src/__tests__/index.tsx"],
      }),
      terser(),
    ],
    external,
  };

  const esm = {
    input: "src/index.tsx",
    output: {
      name: "progressively-react",
      dir: "lib/esm",
      format: "esm",
      globals,
    },
    plugins: [
      nodeResolve(),
      typescript({
        outDir: "lib/esm",
        target: "ESNext",
        exclude: ["src/__tests__/index.tsx"],
      }),
      terser(),
    ],
    external,
  };

  return [legacy, esm];
};
