import { boolean, select } from '@storybook/addon-knobs'
import docs from '../../../docs/components/MaCard.docs.mdx'

export default {
  title: 'Components/Card',
  parameters: {
    docs: { page: docs },
  },
}

export const Card = () => {
  const color = select('Color', ['white', 'gray'], 'white')
  const hasPaddingTop = boolean('Bottom cards have padding top', true)

  return {
    template: `
      <ma-stack space="medium">
        <ma-card v-bind="$props">
          I'm a {{ color }} layout card
        </ma-card>
        <ma-card v-bind="$props">
          I'm another {{ color }} layout card
        </ma-card>
      </ma-stack>
    `,

    props: {
      color: {
        default: color,
      },
      hasPaddingTop: {
        default: hasPaddingTop,
      },
    },
  }
}
