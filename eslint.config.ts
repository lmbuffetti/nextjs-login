// eslint.config.ts
import { defineConfig } from 'eslint/config'
import cypress from 'eslint-plugin-cypress'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'
const js = require('@eslint/js')
const globals = require('globals')
const parserTs = require('@typescript-eslint/parser')
const tseslint = require('@typescript-eslint/eslint-plugin')
const pluginReact = require('eslint-plugin-react')
const jsxA11y = require('eslint-plugin-jsx-a11y')

export default defineConfig([
  // Base JS/TS config
  js.configs.recommended,

  // React recommended preset (ordine importante)
  pluginReact.configs.flat.recommended,

  // Global config for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        RequestInit: 'readonly',
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Jest unit tests
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: globals.jest,
    },
    plugins: {
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      'testing-library/no-unnecessary-act': 'warn',
      'jest-dom/prefer-to-have-text-content': 'warn',
    },
  },

  // Cypress e2e tests
  {
    files: ['cypress/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      cypress: cypress,
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'warn',
    },
  },
])
