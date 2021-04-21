import MaModal from './MaModal'
import docs from '../../../docs/components/MaModal.docs.mdx'

export default {
  title: 'Components/Modal',
  component: MaModal,
  args: {
    title: 'Modal demo title',
  },
  argTypes: {
    width: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    headerType: {
      control: {
        type: 'select',
        options: ['white', 'gradient'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-modal v-bind="$props">
      <template #trigger="{openModal}">
        <ma-button @click="openModal">Open the modal</ma-button>
      </template>

      <template #content="{closeModal}">
        <ma-stack space="medium" align="left">
          <span>My amazing content</span>
          <ma-text-field label="And a random input" type="text" />
          <ma-button @click="closeModal">close</ma-button>
        </ma-stack>
      </template>
    </ma-modal>
  `,
})

export const Modal = Template.bind({})
