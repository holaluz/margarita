import { storiesOf } from '@storybook/vue'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'

import MaPill from './MaPill'

const AVAILABLE_COLORS = ['green', 'orange', 'red', 'gray', 'dark', 'blue']

storiesOf('Pill', module)
  .addDecorator(withKnobs)
  .add('Pill', () => {
    const color = select('Color', AVAILABLE_COLORS, 'green')
    const pillText = text('Pill Text', 'Active')

    return {
      components: { MaPill, MaGridColumn },

      template: `
        <ma-grid-column>
          <ma-pill
            :color="color"
            :text="pillText"
          />
        </ma-grid-column>`,

      props: {
        color: {
          default: color,
        },
        pillText: {
          default: pillText,
        },
      },
    }
  })
