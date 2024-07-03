module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
    'vitest-globals/env': true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['prettier', 'import', 'react', 'jsx-a11y', 'vitest-globals'],
  extends: ['eslint:recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
  },
};
