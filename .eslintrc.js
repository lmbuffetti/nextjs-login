const prettier = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleAttributePerLine: true,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'avoid',
}

module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'simple-import-sort',
    'no-relative-import-paths',
    'react',
    'formatjs',
  ],
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    semi: [2, 'never'],
    'prettier/prettier': ['error', prettier],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-relative-import-paths/no-relative-import-paths': 'warn',
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-default-message': ['error', 'literal'],
    '@typescript-eslint/no-var-requires': 'off',
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
    'formatjs/enforce-placeholders': 'error',
    'formatjs/no-multiple-whitespaces': 'error',
    'formatjs/no-offset': 'error',
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl'],
      config: 'tailwind.config.js',
      whitelist: ['h-[calc(100%-1rem)]'],
    },
    react: {
      version: '18.2.0',
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // Force the setting of a swagger description on each api endpoint
      files: ['app/api/**/*.ts'],
      plugins: ['jsdoc'],
      rules: {
        'jsdoc/no-missing-syntax': [
          'error',
          {
            contexts: [
              {
                comment: 'JsdocBlock:has(JsdocTag[tag=swagger])',
                context: 'any',
                message:
                  '@swagger documentation is required on each API. Check this out for syntax info: https://github.com/jellydn/next-swagger-doc',
              },
            ],
          },
        ],
      },
    },
  ],
}
