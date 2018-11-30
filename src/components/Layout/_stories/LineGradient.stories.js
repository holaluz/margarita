import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import LineGradientNotes from './notes/LineGradient.md'

import LineGradient from '../LineGradient/LineGradient'
import GridColumn from '../../Grid/GridColumn/GridColumn'

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add('LineGradient', withMarkdownNotes(LineGradientNotes)(() => {
    const weight = select('weight', [ 'small', 'medium', 'large' ], 'small')

    return ({
      components: { LineGradient, GridColumn },
      template: `
        <GridColumn class="grid-col--12">
          <LineGradient
            v-bind:weight="weight"
          >
          </LineGradient>
        </GridColumn>
      `,

      data () {
        return {
          weight: weight
        }
      }
    })
}))
