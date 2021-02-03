import { action } from '@storybook/addon-actions'
import MaButton from '../MaButton'

export default {
  title: 'Components/Button',
  component: MaButton,
  /**
   * As per now, storybook does handle 'String' type properties as a text input, thus requiring to
   * manually set the available property's options.
   * See: https://storybook.js.org/docs/vue/essentials/controls#annotation
   * See: https://github.com/storybookjs/storybook/issues/13764
   */
  argTypes: {
    tag: {
      control: {
        type: 'select',
        options: ['a', 'button'],
      },
    },
    category: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'white', 'gradient', 'no-background'],
      },
    },
  },
}

const actionsData = {
  click: action('click'),
}

const getProps = (argTypes) =>
  Object.values(argTypes)
    .filter((a) => a.table?.category === 'props')
    .map((a) => a.name)

const Template = (args, { argTypes }) => ({
  props: getProps(argTypes),
  methods: actionsData,
  template: `<ma-button v-bind="$props" @click="click">click me</ma-button>`,
})

export const DefaultButton = Template.bind({})
