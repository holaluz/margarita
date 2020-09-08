const path = require('path')

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
      },
      {
        loader: 'highlight-loader',
      },
      {
        loader: 'markdown-loader',
        options: {
          breaks: true,
          gfm: true,
        },
      },
    ],
    include: path.resolve(__dirname, '../../src'),
  })

  return config
}
