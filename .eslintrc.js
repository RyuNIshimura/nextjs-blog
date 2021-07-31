module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    // Parsing error: 'import' and 'export' may appear only with 'sourceType: module' 対策
    sourceType: 'module',
    // eslint Parsing error: Unexpected token function with async 対策
    ecmaVersion: 8
  },
  plugins: [
    'react'
  ],
  ignorePatterns: [
    'node_modules/*',
    'docs/*',
    'styles/*',
    'public/*',
    '.next/*',
    'out/*',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  // https://eslint.org/docs/rules/
  rules: {
    'semi': ['error', 'never'],
    'eqeqeq': 2,
    'quotes': [2, 'single', 'avoid-escape'],
    'indent': ['error', 2],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prefer-const': 'error', // let const の監視
    'no-var': 'error' // varの使用を不可
  }
}