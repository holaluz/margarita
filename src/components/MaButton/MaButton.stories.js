import MaButton from '../MaButton'
import docs from '../../../docs/components/MaButton.docs.mdx'

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
    /**
     * Tell Storybook that 'click' arg to your story should be an action
     */
    click: { action: 'click' },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-button v-bind="$props" @click="click">click me</ma-button>`,
})

export const Button = Template.bind({})
