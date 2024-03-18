import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default () => {
  return {
    input: "src/index.tsx",
    output: {
      file: "dist/progressively.qualitative-analytics.min.js",
      format: "iife", // Immediately Invoked Function Expression
      sourcemap: true, // Generate source map
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },

    plugins: [
      resolve({
        browser: true,
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these extensions
      }),
      commonjs(),
      typescript(),
      terser(),
    ],
  };
};
