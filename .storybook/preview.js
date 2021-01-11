// preview.js configures the "preview" iframe that renders your components
import Vue from 'vue'
import margarita from '../src/index'

Vue.use(margarita)

export const parameters = {
  layout: 'centered',

  options: {
    storySort: {
      order: ['Tokens', 'Layout', 'Components', 'Plugins'],
      method: 'alphabetical',
    },
  },
}