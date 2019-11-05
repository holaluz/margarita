module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@margarita/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost:6006',
  setupTestFrameworkScriptFile: '@holaluz/npm-scripts/jest.setup.js',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
