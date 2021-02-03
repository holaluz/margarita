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
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/scss', to: 'scss' }],
      }),
    ],
  },
}
