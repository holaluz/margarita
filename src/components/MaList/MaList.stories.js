import MaList from './MaList'
import docs from '../../../docs/components/MaList.docs.mdx'
import { tones } from '@margarita/tokens'

export default {
  title: 'Components/List',
  component: MaList,
  argTypes: {
    tone: {
      control: {
        type: 'select',
        options: Object.keys(tones),
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['bullet', 'check', 'ordered'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="display: flex;">
      <ma-list v-bind="$props"><ma-text tag="p">Item 1</ma-text><ma-text tag="span" tone="pink">Item 2</ma-text><ma-text tag="p">Item 3 <a href="">here</a></ma-text></ma-list>
  </div>`,
})

export const List = Template.bind({})
