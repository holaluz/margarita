import { create } from '@storybook/theming/create'
import brandImage from './holaluz.svg'
import './style.scss'

export default create({
  base: 'light',
  brandTitle: 'Holaluz Margarita',
  brandUrl: 'https://www.holaluz.com/',
  brandImage,
})
