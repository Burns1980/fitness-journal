import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import ts from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Enable rules that require type information
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      'react/prop-types': 'off', // No need with TypeScript
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      // React specific rules
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
    },
  },
  {
    files: ['**/*.config.js', '**/*.config.mjs', '**/*.config.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  {
    files: ['__tests__/**'],
    ...jest.configs['flat/recommended'],
    ...jest.configs['flat/style'],
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  prettier,

  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/static/',
      'eslint.config.mjs',
      'supabase/',
    ],
  }
);
