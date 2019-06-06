module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    // Vue specific formatting rules to prettier
    'prettier/vue',
    // Treat prettier errors as linting errors
    // Disable certain rules that interfere with prettier
    'plugin:prettier/recommended',
    'plugin:vue-a11y/recommended',
    // 'plugin:vue-a11y/base',
  ],
  plugins: [
    'vue',
    'vue-a11y',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
}
