module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    camelcase: 0,
    'func-names': 0,
    'global-require': 0,
    'no-shadow': 0,
    'no-undef': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    'react/style-prop-object': 0,
  },
};
