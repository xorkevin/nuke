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
  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
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

      // add additional rules
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-promise-executor-return': 'error',
      'no-unused-private-class-members': 'error',
      'no-use-before-define': 'error',
      'require-atomic-updates': 'error',
      'block-scoped-var': 'error',
      curly: 'error',
      'default-param-last': 'error',
      eqeqeq: 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': 'error',
      'no-implied-eval': 'error',
      'no-label-var': 'error',
      'no-multi-assign': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-return-assign': 'error',
      'no-sequences': 'error',
      'no-useless-computed-key': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-object-has-own': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'sort-imports': ['error', {allowSeparatedGroups: true}],

      // override recommended
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];