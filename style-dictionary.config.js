module.exports = {
  source: ['.style-dictionary/index.js'],
  platforms: {
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
