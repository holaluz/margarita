const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: [ 'style-loader', 'css-loader', 'sass-loader' ],
    include: path.resolve(__dirname, '../src')
  })

  defaultConfig.module.rules.push({
    test: /\.styl$/,
    loaders: [ 'style-loader', 'css-loader', 'stylus-loader' ]
  })

  // Replacing the markdown one
  defaultConfig.module.rules[2] = {
    test: /\.md$/,
    use: [{
      loader: 'html-loader'
    }, {
      loader: 'highlight-loader',
    }, {
      loader: 'markdown-loader',
      options: {
        breaks: true,
        gfm: true
      }
    }],
    include: path.resolve(__dirname, '../src')
  }

  defaultConfig.resolve.alias['^'] = path.resolve(__dirname, '../.storybook')
  defaultConfig.resolve.alias['@'] = path.resolve(__dirname, '../src')

  return defaultConfig
}
