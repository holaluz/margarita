const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@margarita': path.resolve(__dirname, 'src/'),
      },
    },
  },
}
