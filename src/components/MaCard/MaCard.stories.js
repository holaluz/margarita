import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridContainer from '@margarita/components/MaGridContainer'
import MaGridRow from '@margarita/components/MaGridRow'

import MaCard from '@margarita/components/MaCard'

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('Card', () => {
    const color = select('Color', ['white', 'gray'], 'white')
    const hasPaddingTop = boolean('Bottom cards have padding top', true)

    return {
      components: { MaCard, MaGridContainer, MaGridRow, MaGridColumn },
      template: `
        <ma-grid-container class="grid-example">
          <ma-grid-row>
            <ma-grid-column class="ma-grid-col--12">
              <ma-card
                :color="color"
                has-margin-top
              >
              I'm a {{ color }} layout card
              </ma-card>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row>
            <ma-grid-column v-for="col in 2" :key="col" class="ma-grid-col--6">
              <ma-card
                color="gray"
                :hasPaddingTop="hasPaddingTop"
              />
            </ma-grid-column>
          </ma-grid-row>
        </ma-grid-container>
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
  })
