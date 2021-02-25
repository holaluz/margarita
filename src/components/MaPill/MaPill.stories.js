import MaPill from './MaPill'
import docs from '../../../docs/components/MaPill.docs.mdx'

export default {
  title: 'Components/Pill',
  component: MaPill,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['green', 'orange', 'red', 'gray', 'dark', 'blue'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-pill v-bind="$props" />`,
})

export const Pill = Template.bind({})
Pill.args = {
  text: 'Example Pill Text',
}
