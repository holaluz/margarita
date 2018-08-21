import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/stylus/theme.styl'
import 'vuetify/src/stylus/main.styl'

import { addDecorator, configure } from '@storybook/vue'
import vue from 'vue'
import vuetify from 'vuetify'

const req = require.context('../src/components', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

vue.use(vuetify, {
  iconfont: 'mdi'
})

configure(loadStories, module)
