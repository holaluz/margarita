const color = require('./color')

module.exports = {
  'pink-orange-yellow': `linear-gradient(to right, ${color.pink.base}, ${color.orange.base} 85%, ${color.yellow.dark})`,
  'turquoise-green': `linear-gradient(to right, ${color.turquoise.base}, ${color.green.dark})`,
}
