// ESLint flat config for TypeScript + Node + Playwright
import { FlatCompat } from '@eslint/eslintrc';
import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';

const compat = new FlatCompat({ recommendedConfig: {} });

export default [
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/explicit-function-return-type': ['off', {}],
      '@typescript-eslint/no-explicit-any': ['warn', {}],
      'no-console': ['warn'],
    },
  },
];
