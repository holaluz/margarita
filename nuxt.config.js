const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  srcDir: './src',

  head: {
    title: 'Margarita',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Estela will do this' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  plugins: [ '~/plugins/vuetify.js' ],

  css: [
    '~/stylus/vuetify/stylus.styl'
  ],

  build: {
    babel: {
      plugins: [
        [ "transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },

    vendor: [
      '~/plugins/vuetify.js'
    ],

    extractCSS: true,

    extend (config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [ /^vuetify/ ]
          })
        ]
      }
    }
  }
}
