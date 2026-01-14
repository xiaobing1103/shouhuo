module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
};
