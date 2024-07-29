import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      curly: "error",
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-case-declarations": "off",
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  // ...tseslint.configs.recommendedTypeChecked,
  // pluginReact.configs.flat.recommended,
  {
    ignores: [
      "**/dist/",
      "**/node_modules/",
      "**/*.json",
      "**/*.js",
      "/build/**",
    ],
  },
);
