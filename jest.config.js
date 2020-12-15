const merge = require('lodash.merge')
const jestConfig = require('@holaluz/npm-scripts').jest

module.exports = merge(jestConfig, {
  transform: {
    '.+\\.(css|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@margarita/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen',
})
