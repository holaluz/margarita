const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@margarita': path.resolve(__dirname, 'src/'),
      },
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/scss',
          to: 'scss',
        },
      ]),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/scss/margarita-tokens.scss";`,
      },
    },
  },
}
