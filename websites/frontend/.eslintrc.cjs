/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

const rules = {
  "react/react-in-jsx-scope": "off",
  "@typescript-eslint/no-empty-function": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "react/prop-types": "off",
  "react/no-unescaped-entities": "off",
  "jsx-a11y/no-static-element-interactions": "off",
  "jsx-a11y/click-events-have-key-events": "off",
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ["**cypress**"],
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules,
      settings: {
        react: {
          version: "detect",
        },

        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      rules,
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },

    // Node
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
};
