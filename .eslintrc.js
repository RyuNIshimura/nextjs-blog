module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  rules: {
    'semi': ['error', 'never'],
    'eqeqeq': 2,
    'quotes': [2, 'single', 'avoid-escape'],
    'indent': ['error', 2],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
    'import/no-anonymous-default-export': 'off'
  }
}