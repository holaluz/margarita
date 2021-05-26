import MaText from './MaText'
import docs from '../../../docs/components/text-components/MaText.docs.mdx'
import { text, tones } from '@margarita/tokens'

export default {
  title: 'Components/Text Components/Text',
  component: MaText,
  argTypes: {
    tag: {
      control: {
        type: 'select',
        options: ['p', 'span', 'label'],
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
        options: Object.keys(text.textSize.mobile),
      },
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
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
  <div style="display: flex">
      <ma-text v-bind="$props" style=" width: 10rem">I'M a text</ma-text>
      <ma-text v-bind="$props" style="background-color:var(--color-blue-light); width: 10rem">
        I'M a text
      </ma-text>
  </div>`,
})

export const Text = Template.bind({})
