import { configure, addDecorator, addParameters } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import holaluzTheme from './holaluzTheme'

function loadStories() {
  const req = require.context('../../src/components', true, /.stories.js$/)
  req.keys().forEach(filename => req(filename))
}

addParameters({
  options: {
    theme: holaluzTheme,
  },
})
configure(loadStories, module)
addDecorator(withA11y)
