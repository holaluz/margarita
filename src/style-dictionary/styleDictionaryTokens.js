const transformToStyleDictionary = require('./transformToStyleDictionary')
const color = require('../tokens/color')
const spacing = require('../tokens/spacing')
const shadow = require('../tokens/shadow')
const { breakpoints } = require('../tokens/breakpoint')

module.exports = {
  color: transformToStyleDictionary(color),
  spacing: transformToStyleDictionary(spacing),
  shadow: transformToStyleDictionary(shadow),
  breakpoint: transformToStyleDictionary(breakpoints),
}
