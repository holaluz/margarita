import '@mdi/font/css/materialdesignicons.css'
import '../src/stylus/main.styl'

import { addDecorator, configure } from '@storybook/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

const req = require.context('../src/components', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

configure(loadStories, module)
