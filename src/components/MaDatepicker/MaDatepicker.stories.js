import { storiesOf } from '@storybook/vue'
import { withKnobs, select, text, boolean, date } from '@storybook/addon-knobs'

import notes from './MaDatepicker.md'
import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridRow from '@margarita/components/MaGridRow'
import MaDatepicker from './MaDatepicker'
import MaText from '../MaText'

storiesOf('Datepicker', module)
  .addDecorator(withKnobs)
  .add(
    'Single Datepicker',
    () => {
      const label = text('Label', 'Start date')
      const locale = select('Locale', ['es-ES', 'ca-ES', 'en-US'])
      const startDate = date('Start date')
      const endDate = date('End date')
      const isRange = boolean('Is range', false)

      return {
        components: { MaGridColumn, MaGridRow, MaDatepicker, MaText },

        template: `
        <div>
          <h2>Single picker:</h2>
          <ma-grid-row>
            <ma-grid-column class="ma-grid-col--6">
              <ma-datepicker
                v-model="value"
                :label="label"
                :locale="locale"
                :startDate="startDate"
                :endDate="endDate"
                :isRange="isRange"
              />
            </ma-grid-column>
          </ma-grid-row>
        </div>`,

        props: {
          label: {
            default: label,
          },
          locale: {
            default: locale,
          },
          isRange: {
            default: isRange,
          },
          startDate: {
            default: startDate ? new Date(startDate) : null,
          },
          endDate: {
            default: endDate ? new Date(endDate) : null,
          },
        },

        data() {
          return {
            value: new Date(),
          }
        },
      }
    },
    { notes }
  )
