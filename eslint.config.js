import tseslint from 'typescript-eslint';

// Polyfill structuredClone if it doesn't exist in the environment
if (typeof structuredClone !== 'function') {
  global.structuredClone = obj => JSON.parse(JSON.stringify(obj));
}

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