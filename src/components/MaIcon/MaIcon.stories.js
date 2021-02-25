import icons from './availableIcons'
import docs from '../../../docs/components/MaIcon.docs.mdx'
import MaIcon from './MaIcon'

export default {
  title: 'Components/Icon',
  component: MaIcon,
  args: {
    icon: icons[0],
    id: 'randomId',
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: icons,
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-icon v-bind="$props" />`,
})

export const Icon = Template.bind({})
