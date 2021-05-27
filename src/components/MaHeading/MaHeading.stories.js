import MaHeading from '../MaHeading'
import { tones } from '@margarita/tokens'
import docs from '../../../docs/components/text-components/MaHeading.docs.mdx'

export default {
  title: 'Components/Text Components/Heading',
  component: MaHeading,
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: ['none', '1', '2', '3', '4', '5', '6'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      },
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
      },
    },
    tone: {
      control: {
        type: 'select',
        options: Object.keys(tones),
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
      <ma-heading v-bind="$props" style=" width: 30rem" >I'M a heading</ma-heading>
      <ma-heading v-bind="$props" style="width: 30rem; margin-left:4rem; background-color:var(--color-blue-light)">
        I'M a heading
      </ma-heading>
  </div>`,
})

export const Heading = Template.bind({})
