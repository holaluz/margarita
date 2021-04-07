import MaTextField from './MaTextField'
import docs from '../../../docs/components/MaTextField.docs.mdx'
import docsMaTextFieldWithSuffix from '../../../docs/components/MaTextFieldWithSuffix.docs.mdx'

const hideComponentProperties = {
  blur: { table: { disable: true } },
  input: { table: { disable: true } },
  change: { table: { disable: true } },
  enter: { table: { disable: true } },
  'v-model': { table: { disable: true } },
  errorMessage: { table: { disable: true } },
  hasError: { table: { disable: true } },
  label: { table: { disable: true } },
  tone: { table: { disable: true } },
  bold: { table: { disable: true } },
  id: { table: { disable: true } },
  labelSibling: { table: { disable: true } },
  inputSibling: { table: { disable: true } },
  suffix: { table: { disable: true } },
}

export default {
  title: 'Components/TextField',
  component: MaTextField,
  args: {
    label: 'Label',
    id: 'text-input',
  },
  argTypes: {
    'v-model': { control: false },
    blur: { action: 'blur' },
    input: { action: 'input' },
    change: { action: 'change' },
    enter: { action: 'enter' },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-text-field
      v-bind="$props"
      :aria-label="ariaLabel"
      @input="input"
      @change="change"
      @blur="blur"
    />
  `,
})

export const TextField = Template.bind({})
TextField.argTypes = {
  ariaLabel: {
    name: 'aria-label',
    control: {
      type: 'text',
    },
  },
  placeholder: {
    defaultValue: 'This is a placeholder',
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
}

const TextFieldWithSiblingLabelTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-text-field v-bind="$props">
      <ma-text size="small" slot="labelSibling">{{siblingLabel}}</ma-text>
    </ma-text-field>
  `,
})

export const TextFieldWithSiblingLabel = TextFieldWithSiblingLabelTemplate.bind(
  {}
)
TextFieldWithSiblingLabel.argTypes = {
  siblingLabel: {
    name: 'Sibling label',
    defaultValue: 'Additional label',
    control: { type: 'text' },
  },
  ...hideComponentProperties,
}

const TextFieldWithIconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-text-field v-bind="$props">
      <ma-button slot="inputSibling">
        <ma-icon
          icon="Arrow"
          width="16"
          height="16"
        />
      </ma-button>
    </ma-text-field>
  `,
})

export const TextFieldWithIcon = TextFieldWithIconTemplate.bind({})
TextFieldWithIcon.argTypes = {
  ...hideComponentProperties,
}

const TexFieldWithSuffixTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-text-field type="number" v-bind="$props" />`,
})

export const TextFieldWithSuffix = TexFieldWithSuffixTemplate.bind({})
TextFieldWithSuffix.argTypes = {
  ...hideComponentProperties,
  suffix: {
    name: 'Suffix',
    defaultValue: '€',
    control: { type: 'text' },
  },
}
TextFieldWithSuffix.parameters = {
  docs: { page: docsMaTextFieldWithSuffix },
}
