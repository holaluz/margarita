// preview.js configures the "preview" iframe that renders your components
import Vue from 'vue'
import margarita from '../src/index'

Vue.use(margarita)

export const parameters = {
  layout: 'centered',

  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Getting Started', 'Design Principles'],
        'Tokens',
        ['Colors', 'Spacing', 'Breakpoints', 'Shadows'],
        'Layout',
        'Components',
        ['Form Elements', 'Text Components'],
        'Plugins',
      ],
      method: 'alphabetical',
    },
  },
}
