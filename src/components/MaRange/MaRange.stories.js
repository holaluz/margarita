import MaRange from './MaRange'
import docs from '../../../docs/components/form-elements/MaRange.docs.mdx'

const defaultSteps = [
  { text: 'Special', value: 'special' },
  { text: 'Low', value: 'low' },
  { text: 'Medium', value: 'medium' },
  { text: 'High', value: 'high' },
]

export default {
  title: 'Components/Form Elements/Range',
  component: MaRange,
  decorators: [
    () => ({
      template: '<div style="width: 600px"><story/></div>',
    }),
  ],
  args: {
    steps: defaultSteps,
    id: 'Demo range',
    label: 'Demo range',
  },
  argTypes: {
    'v-model': {
      control: false,
    },
    input: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  data: () => ({ selectedStep: 'medium' }),
  props: Object.keys(argTypes),
  template: `<ma-range v-model="selectedStep" v-bind="$props" />`,
})

export const Range = Template.bind({})
