import MaSelect from './MaSelect'
import docs from '../../../docs/components/MaSelect.docs.mdx'

const DEFAULT_OPTIONS = [
  { label: 'Placeholder text', text: 'Placeholder text', disabled: true },
  { label: 'Option1', text: 'Option1', value: 'option1' },
  { label: 'Option2', text: 'Option2', value: 'option2' },
  { label: 'Option3', text: 'Option3', value: 'option3' },
  { label: 'Option4', text: 'Option4', value: 'option4' },
]

export default {
  title: 'Components/Select',
  component: MaSelect,
  args: {
    options: DEFAULT_OPTIONS,
    label: `Select's label`,
    errorMessage: 'This is an error message',
  },
  argTypes: {
    weight: {
      control: {
        type: 'select',
        options: ['', 'bold', 'semibold', 'medium', 'regular'],
      },
    },
    formatter: {
      description: 'Formats the given options before rendering them',
    },
    change: { action: 'change' },
    'v-model': { table: { disable: true } },
    fieldClass: { table: { disable: true } },
    mount: { table: { disable: true } },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  data: () => ({ selectedOption: '' }),
  props: Object.keys(argTypes),
  template: `<ma-select id="select-input" v-bind="$props" v-model="selectedOption" @change="change"/>`,
})

export const Select = Template.bind({})
