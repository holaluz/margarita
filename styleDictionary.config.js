module.exports = {
  source: ['./src/tokens/*.js'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: './src/scss/variables/',
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
          mapName: 'layout-spacing',
          filter: { type: 'spacing' },
        },
      ],
    },
  },
}
