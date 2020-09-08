import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'
import brandImage from './holaluz.svg'

const theme = create({
  base: 'light',
  brandTitle: 'Holaluz Margarita',
  brandUrl: 'https://www.holaluz.com/',
  brandImage,
})

addons.setConfig({
  panelPosition: 'bottom',
  theme,
})
