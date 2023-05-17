import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import {FlatCompat} from '@eslint/eslintrc';

const compat = new FlatCompat();

const mergeConfig = (arr, p) =>
  arr.reduce((plugins, v) => Object.assign(plugins, p(v)), {});
const mergePlugins = (arr) => mergeConfig(arr, (v) => v.plugins);
const mergeRules = (arr) => mergeConfig(arr, (v) => v.rules);

const tsCompatConfig = compat.config({
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
  plugins: ['@typescript-eslint'],
});
const tsCompatPlugins = mergePlugins(tsCompatConfig);
const tsCompatRules = mergeRules(tsCompatConfig);

const reactHooksCompatConfig = compat.config({
  plugins: ['react-hooks'],
});
const reactHooksPlugins = mergePlugins(reactHooksCompatConfig);

const prettierCompatConfig = compat.config({
  extends: ['prettier'],
});
const prettierCompatRules = mergeRules(prettierCompatConfig);

export default [
  {
    files: [
      'packages/*/lib/**/*.ts',
      'packages/*/lib/**/*.tsx',
      'packages/*/src/**/*.ts',
      'packages/*/src/**/*.tsx',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      ...tsCompatPlugins,
      react,
      ...reactHooksPlugins,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsCompatRules,
      ...reactRecommended.rules,
      ...reactJSXRuntime.rules,
      ...prettierCompatRules,
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];
