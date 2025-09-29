const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const nextPlugin = require("@next/eslint-plugin-next");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const testingLibraryPlugin = require("eslint-plugin-testing-library");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettierConfig = require("eslint-config-prettier");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Base configuration
  js.configs.recommended,

  // TypeScript configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,

      // Custom rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",

      // Performance rules
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-key": "error",

      // Code quality
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "warn",
      "no-debugger": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Test files configuration
  {
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
      "**/test/**/*.{ts,tsx}",
    ],
    plugins: {
      "testing-library": testingLibraryPlugin,
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/prefer-screen-queries": "error",
      "testing-library/no-debugging-utils": "warn",
    },
  },

  // Prettier integration
  prettierConfig,

  // Ignore patterns
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];
