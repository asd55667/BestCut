module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // project: ['./tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    withDefaults: 'readonly',
  },

  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    semi: ['error', 'always'],
    'import/no-absolute-path': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',

    'no-unneeded-ternary': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-bitwise': 'off',
    'no-return-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-constant-condition': 'off',

    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',

    'max-attributes-per-line': 'off',
  },
};
