module.exports = {
  source: ['./src/tokens/*.js'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: './src/scssTokens/',
      files: [
        {
          destination: '_colors.scss',
          format: 'scss/map-flat',
          mapName: 'colors',
          filter: { type: 'color' },
        },
        {
          destination: '_spacing.scss',
          format: 'scss/map-flat',
          mapName: 'spacing',
          filter: { type: 'spacing' },
        },
      ],
    },
  },
}
