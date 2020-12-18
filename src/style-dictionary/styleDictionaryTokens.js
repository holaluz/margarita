const colors = require('../tokens/colors')
const spacing = require('../tokens/spacing')
const addTokenType = require('./addTokenType')

const spacingTokens = addTokenType(spacing, 'spacing')
const colorTokens = addTokenType(colors, 'color')

module.exports = { ...colorTokens, ...spacingTokens }
