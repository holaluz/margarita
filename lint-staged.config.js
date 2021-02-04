const lintStagedConfig = require('@holaluz/npm-scripts').lintStaged

module.exports = {
  ...lintStagedConfig,
  '*.{js,vue}': [
    'npm run vetur:build',
    'npm run format',
    'eslint',
    'npm run test -- --findRelatedTests',
  ],
  './src/tokens/*.js': ['npm run tokens:build'],
}
