import { boolean, select } from '@storybook/addon-knobs'

import MaCard from '@margarita/components/MaCard'
import MaStack from '@margarita/components/MaStack'

export default {
  title: 'Components/Card',
}

export const Card = () => {
  const color = select('Color', ['white', 'gray'], 'white')
  const hasPaddingTop = boolean('Bottom cards have padding top', true)

  return {
    components: { MaCard, MaStack },
    template: `
      <ma-stack space="medium">
        <ma-card :color="color" :has-padding-top="has-padding-top">
          I'm a {{ color }} layout card
        </ma-card>
        <ma-card :color="color" :has-padding-top="has-padding-top">
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
