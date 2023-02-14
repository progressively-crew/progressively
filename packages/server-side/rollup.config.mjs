import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default () => {
  const legacy = {
    input: "src/index.tsx",
    output: {
      name: "progressively-server-side",
      dir: "lib/legacy",
      format: "umd",
    },
    plugins: [
      nodeResolve(),
      typescript({ outDir: "lib/legacy", target: "es5" }),
      terser(),
    ],
  };

  const esm = {
    input: "src/index.tsx",
    output: {
      name: "progressively-server-side",
      dir: "lib/esm",
      format: "esm",
    },
    plugins: [
      nodeResolve(),
      typescript({ outDir: "lib/esm", target: "ESNext" }),
      terser(),
    ],
  };

  return [legacy, esm];
};
