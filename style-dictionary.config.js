module.exports = {
  source: ['.style-dictionary/index.js'],
  platforms: {
    css: {
      transformGroup: 'css',
      files: [
        {
          format: 'css/variables',
          destination: './src/css/tokens.css',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: './src/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/map-deep',
          mapName: 'tokens',
        },
      ],
    },
  },
}
