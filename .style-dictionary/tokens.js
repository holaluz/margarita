const transformToStyleDictionary = require('./transformToStyleDictionary')
const { color, spacing, shadow, breakpoints } = require('../src/tokens')

module.exports = {
  color: transformToStyleDictionary(color),
  spacing: transformToStyleDictionary(spacing),
  shadow: transformToStyleDictionary(shadow),
  breakpoint: transformToStyleDictionary(breakpoints),
}
