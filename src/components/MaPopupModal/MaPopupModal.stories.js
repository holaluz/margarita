import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import notes from './MaPopupModal.md'
import MaGridColumn from '@margarita/components/MaGridColumn'
import MaGridRow from '@margarita/components/MaGridRow'
import MaButton from '@margarita/components/MaButton'
import MaPopupModal from '@margarita/components/MaPopupModal'

storiesOf('Popup Modal', module)
  .addDecorator(withKnobs)
  .add(
    'Popup Modal',
    () => {
      const title = text('Title', 'Lorem ipsum')
      const large = boolean('Large', false)
      const bkTitle = boolean('Bk Title', false)
      const footerButton = boolean('Footer Button', true)
      const buttonText = text('Button Text', 'Close')
      const ariaClose = text('Aria close', 'Close popup')

      return {
        components: { MaButton, MaGridColumn, MaGridRow, MaPopupModal },

        template: `
          <ma-grid-row>
            <ma-grid-column
              class="ma-grid-col--3"
            >
              <ma-button @click="show = true">Open modal</ma-button>
              <ma-popup-modal
                :show="show"
                :title="title"
                :large="large"
                :bkTitle="bkTitle"
                :footerButton="footerButton"
                :buttonText="buttonText"
                :ariaClose="ariaClose"
                @close="show = false"
              >
                Hello world.
              </ma-popup-modal>
            </ma-grid-column>
          </ma-grid-row>`,

        props: {
          title: {
            default: title,
          },
          large: {
            default: large,
          },
          bkTitle: {
            default: bkTitle,
          },
          footerButton: {
            default: footerButton,
          },
          buttonText: {
            default: buttonText,
          },
          ariaClose: {
            default: ariaClose,
          },
        },

        data() {
          return {
            show: false,
          }
        },
      }
    },
    { notes }
  )
