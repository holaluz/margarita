const transformToStyleDictionary = require('./transformToStyleDictionary')
const color = require('../src/tokens/color')
const spacing = require('../src/tokens/spacing')
const shadow = require('../src/tokens/shadow')
const { breakpoints } = require('../src/tokens/breakpoint')

module.exports = {
  color: transformToStyleDictionary(color),
  spacing: transformToStyleDictionary(spacing),
  shadow: transformToStyleDictionary(shadow),
  breakpoint: transformToStyleDictionary(breakpoints),
}
