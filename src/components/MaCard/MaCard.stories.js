import MaCard from '../MaCard'
import docs from '../../../docs/components/MaCard.docs.mdx'

export default {
  title: 'Components/Card',
  component: MaCard,
  argTypes: {
    tone: {
      control: {
        type: 'select',
        options: ['white', 'gray'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-card v-bind="$props">I'm a card</ma-card>`,
})

export const Card = Template.bind({})
