// manager.js configures Storybook's "manager" UI that wraps the preview,
// and also configures addons panel

import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'
import brandImage from './public/images/holaluz.svg'

const theme = create({
  base: 'light',
  brandTitle: 'Holaluz Margarita',
  brandImage,
  brandUrl: 'https://www.holaluz.com/',
})

addons.setConfig({
  panelPosition: 'bottom',
  theme,
})
