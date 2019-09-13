import { storiesOf } from '@storybook/vue'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import notes from './MaDatepicker.md'
import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridRow from '@margarita/components/MaGridRow'
import MaDatepicker from './MaDatepicker'
import MaText from '../MaText'

storiesOf('Datepicker', module)
  .addDecorator(withKnobs)
  .add(
    'Range Datepicker',
    () => {
      const label1 = text('Label start', 'Start date')
      const label2 = text('Label end', 'End date')
      const locale = select('Locale', ['es-ES', 'ca-ES', 'en-US'])

      return {
        components: { MaGridColumn, MaGridRow, MaDatepicker, MaText },

        template: `
        <div>
          <h2>Range datepicker:</h2>
          <ma-grid-row>
            <ma-grid-column class="ma-grid-col--6">
              <ma-datepicker
                v-model="startDate"
                :label="label1"
                :locale="locale"
                :endDate="endDate"
                :isRange="true"
              />
              <ma-datepicker
                v-model="endDate"
                :label="label2"
                :locale="locale"
                :startDate="startDate"
                :isRange="true"
              />
            </ma-grid-column>
          </ma-grid-row>
        </div>`,

        props: {
          label1: {
            default: label1,
          },
          label2: {
            default: label2,
          },
          locale: {
            default: locale,
          },
          isRange: {
            default: true,
          },
        },

        data() {
          return {
            startDate: new Date(),
            endDate: new Date(),
          }
        },
      }
    },
    { notes }
  )
