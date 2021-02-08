const merge = require('lodash.merge')
const postcssConfig = require('@holaluz/npm-scripts').postcss

module.exports = merge(postcssConfig, {
  plugins: {
    'postcss-normalize': {},
  },
})
