import { storiesOf } from '@storybook/vue'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridContainer from '@margarita/components/MaGridContainer'
import MaGridRow from '@margarita/components/MaGridRow'

import MaAlert from '@margarita/components/MaAlert'

storiesOf('Alert', module)
  .addDecorator(withKnobs)
  .add('Alert', () => {
    const size = select('Size', ['small', 'medium', 'large'], 'small')
    const type = select('Type', ['info', 'error', 'success', 'warning'], 'info')
    const alertTitle = text('Title', 'Title')
    const alertText = text('Text', 'Text')

    return {
      components: { MaAlert, MaGridContainer, MaGridRow, MaGridColumn },
      template: `
        <ma-grid-container class="grid-example">
            <ma-grid-row>
                <ma-grid-column class="ma-grid-col--12">
                <ma-alert
                    :size="size"
                    :type="type"
                    :title="title"
                    :text="text"
                />
                </ma-grid-column>
            </ma-grid-row>
          </ma-grid-container>
      `,

      props: {
        size: {
          default: size,
        },
        type: {
          default: type,
        },
        title: {
          default: alertTitle,
        },
        text: {
          default: alertText,
        },
      },
    }
  })
