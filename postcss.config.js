module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-normalize': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    },
  },
}
