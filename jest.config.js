module.exports = {
  moduleFileExtensions: ['vue', 'js', 'json'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@margarita/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testMatch: ['**/*.spec.(js|ts)'],
  setupFilesAfterEnv: ['@holaluz/npm-scripts/jest.setup.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
}
