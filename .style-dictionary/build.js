const StyleDictionary = require('style-dictionary')

StyleDictionary.registerTransform({
  name: 'name/dashed',
  type: 'name',
  transformer: (prop) => prop.path.join('-'),
})

StyleDictionary.extend({
  source: ['.style-dictionary/tokens.js'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/dashed',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
      ],
      files: [
        {
          format: 'css/variables',
          destination: './src/css/tokens.css',
        },
      ],
    },
  },
}).buildAllPlatforms()
