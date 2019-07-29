import { configure, addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'

function loadStories() {
  const req = require.context('../../src/components', true, /.stories.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
addDecorator(withA11y)
