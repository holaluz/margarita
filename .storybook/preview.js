// preview.js configures the "preview" iframe that renders your components
import Vue from 'vue'
import responsivePlugin from '../src/plugins/responsivePlugin'

Vue.use(responsivePlugin)

export const parameters = {
  layout: 'padded',

  options: {
    storySort: {
      order: ['Tokens', 'Layout', 'Components', 'Plugins'],
      method: 'alphabetical',
    },
  },
}
