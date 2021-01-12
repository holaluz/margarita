// preview.js configures the "preview" iframe that renders your components
import Vue from 'vue'
import margarita from '../src'

Vue.use(margarita)

export const parameters = {
  layout: 'centered',

  options: {
    storySort: {
      order: ['Introduction', 'Tokens', 'Layout', 'Components', 'Plugins'],
      method: 'alphabetical',
    },
  },
}
