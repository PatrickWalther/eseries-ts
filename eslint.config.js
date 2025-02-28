import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    extends: [
      tseslint.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    files: ['src/**/*.ts'],
    rules: {
      // Custom rules can be added here
    },
  }
);