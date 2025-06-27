import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
      },
    },
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        'babel.config.js',
        'jest.config.js',
        '.prettierrc.js'
      ],

    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/__tests__/**', // common test folder
            '**/*.test.{js,ts,tsx}',
            '**/*.spec.{js,ts,tsx}',
            'test.{js,ts,tsx}', // top-level test files
            'jest.setup.{js,ts}', // Jest setup files
            '**/test-utils.{js,ts,tsx}',
          ],
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true },
      ],
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'], // allow "state.xxx = yyy"
        },
      ],
      'react/function-component-definition': 'off',
      'react/no-unused-prop-types': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'object-curly-newline': 'off',
      'arrow-parens': 'off'
    },
  },
];
