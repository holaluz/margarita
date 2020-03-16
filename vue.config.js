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
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
  },
}
