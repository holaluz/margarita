const addTokenType = require('./addTokenType')
const color = require('../tokens/color')
const spacing = require('../tokens/spacing')
const shadow = require('../tokens/shadow')
const { breakpoints } = require('../tokens/breakpoint')

module.exports = {
  color: addTokenType(color, 'color'),
  spacing: addTokenType(spacing, 'spacing'),
  shadow: addTokenType(shadow, 'shadow'),
  breakpoint: addTokenType(breakpoints, 'breakpoint'),
}
