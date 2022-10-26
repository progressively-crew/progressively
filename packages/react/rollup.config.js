import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const external = ["react"];
const globals = { react: "react" };

const ssrRootFiles = ["ssr.ts"];

export default () => {
  const ssrConfigs = ssrRootFiles.map((ssrRootFile) => ({
    input: `src/${ssrRootFile}`,
    output: {
      dir: "lib",
      format: "cjs",
      globals,
    },
    plugins: [nodeResolve(), typescript({ outDir: "lib" }), terser()],
    external,
  }));

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
      typescript({ outDir: "lib/legacy", target: "es5" }),
      terser(),
    ],
    external,
  };

  const modern = {
    input: "src/index.tsx",
    output: {
      name: "progressively-react",
      dir: "lib/modern",
      format: "umd",
      globals,
    },
    plugins: [
      nodeResolve(),
      typescript({ outDir: "lib/modern", target: "ESNext" }),
      terser(),
    ],
    external,
  };
  return [legacy, modern].concat(ssrConfigs);
};
