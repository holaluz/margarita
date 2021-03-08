import MaTextList from './MaTextList'
import docs from '../../../docs/components/MaTextList.docs.mdx'
import { tones } from '@margarita/tokens'

export default {
  title: 'Components/TextList',
  component: MaTextList,
  args: {
    listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
  argTypes: {
    tag: {
      control: {
        type: 'select',
        options: ['ul', 'ol'],
      },
    },
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
    icon: {
      control: {
        type: 'select',
        options: ['bullet', 'check'],
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
      <ma-text-list v-bind="$props">
  </div>`,
})

export const TextList = Template.bind({})
