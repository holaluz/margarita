import MaOption from './MaOption'
import docsRadio from '../../../docs/components/form-elements/MaOption/Radio.docs.mdx'
import docsCheckbox from '../../../docs/components/form-elements/MaOption/Checkbox.docs.mdx'
import { tones } from '@margarita/tokens'

export default {
  title: 'Components/Form Elements/Option',
  component: MaOption,
  argTypes: {
    type: {
      control: false,
    },
    'v-model': {
      control: false,
    },
    change: { action: 'change' },
    size: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium'],
      },
    },
    tone: {
      control: {
        type: 'select',
        options: Object.keys(tones),
      },
    },
  },
}

const RadioTemplate = (args, { argTypes }) => {
  return {
    data: () => ({
      selectedOption: 'radio1',
    }),
    props: Object.keys(argTypes),
    template: `
      <ma-stack space="small">
        <ma-option v-model="selectedOption" v-bind="$props" value="radio1" id="radio1" @change="change">
          My first radio
        </ma-option>
        <ma-option v-model="selectedOption" v-bind="$props" value="radio2" id="radio2" @change="change">
          My second radio
        </ma-option>
      </ma-stack>
    `,
  }
}

export const Radio = RadioTemplate.bind({})
Radio.args = {
  type: 'radio',
}
Radio.parameters = {
  docs: { page: docsRadio },
}

const CheckboxTemplate = (args, { argTypes }) => {
  return {
    data: () => ({
      checkedOption: [],
    }),
    props: Object.keys(argTypes),
    template: `
      <ma-stack space="small">
        <ma-option v-model="checkedOption" v-bind="$props" value="checkbox1" id="checkbox1" @change="change">
          My first checkbox
        </ma-option>
        <ma-option v-model="checkedOption" v-bind="$props" value="checkbox2" id="checkbox2" @change="change">
          My second checkbox
        </ma-option>
      </ma-stack>
    `,
  }
}

export const Checkbox = CheckboxTemplate.bind({})
Checkbox.args = {
  type: 'checkbox',
}

Checkbox.parameters = {
  docs: { page: docsCheckbox },
}
