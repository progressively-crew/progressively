import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
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

  const modern = {
    input: "src/index.tsx",
    output: {
      name: "progressively-server-side",
      dir: "lib/modern",
      format: "umd",
    },
    plugins: [
      nodeResolve(),
      typescript({ outDir: "lib/modern", target: "ESNext" }),
      terser(),
    ],
  };
  return [legacy, modern];
};
