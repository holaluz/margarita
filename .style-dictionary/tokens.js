const transformToStyleDictionary = require('./transformToStyleDictionary')
const {
  color,
  spacing,
  shadow,
  breakpoints,
  gradient,
} = require('../src/tokens')

module.exports = {
  color: transformToStyleDictionary(color),
  gradient: transformToStyleDictionary(gradient),
  spacing: transformToStyleDictionary(spacing),
  shadow: transformToStyleDictionary(shadow),
  breakpoint: transformToStyleDictionary(breakpoints),
}
