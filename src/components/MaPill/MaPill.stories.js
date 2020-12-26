import { select, text } from '@storybook/addon-knobs'

const AVAILABLE_COLORS = ['green', 'orange', 'red', 'gray', 'dark', 'blue']

export default {
  title: 'Components/Pill',
}

export const Pill = () => {
  const color = select('Color', AVAILABLE_COLORS, 'green')
  const pillText = text('Pill Text', 'Active')

  return {
    template: `
      <ma-pill :color="color" :text="pillText" />
    `,

    props: {
      color: {
        default: color,
      },
      pillText: {
        default: pillText,
      },
    },
  }
}
