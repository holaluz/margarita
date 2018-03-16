import { addDecorator, configure } from '@storybook/vue'
import './styles.scss'

import centered from '@storybook/addon-centered'

addDecorator(centered)

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)
