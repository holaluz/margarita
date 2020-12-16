import { select, text } from '@storybook/addon-knobs'

import MaModal from '@margarita/components/MaModal'
import MaStack from '@margarita/components/MaStack'
import MaButton from '@margarita/components/MaButton'
import MaTextField from '@margarita/components/MaTextField'

export default {
  title: 'Components/Modal',
}

const MODAL_WIDTHS = ['small', 'medium', 'large']

export const Modal = () => {
  const title = text('Title', 'Enviar oferta por e-mail')
  const width = select('Width', MODAL_WIDTHS, MODAL_WIDTHS[1])
  const headerType = select('Header type', ['white', 'gradient'], 'white')

  return {
    components: { MaModal, MaStack, MaButton, MaTextField },
    template: `
      <ma-modal :title="title" :width="width" :header-type="headerType">
        <template #trigger="{openModal}">
          <ma-button @click="openModal">Open the modal</ma-button>
        </template>

        <template #content="{closeModal}">
          <ma-stack space="xsmall" align="left">
            <span>My amazing content</span>
            <ma-text-field label="And a random input" type="text" />
            <ma-button @click="closeModal">close</ma-button>
          </ma-stack>
        </template>
      </ma-modal>
    `,

    props: {
      title: {
        default: title,
      },
      width: {
        default: width,
      },
      headerType: {
        default: headerType,
      },
    },
  }
}
