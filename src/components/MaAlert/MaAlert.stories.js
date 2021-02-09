import MaAlert from '../MaAlert'
import docs from '../../../docs/components/MaAlert.docs.mdx'

export default {
  title: 'Components/Alert',
  component: MaAlert,
  /**
   * As per now, storybook does handle 'String' type properties as a text input, thus requiring to
   * manually set the available property's options.
   * See: https://storybook.js.org/docs/vue/essentials/controls#annotation
   * See: https://github.com/storybookjs/storybook/issues/13764
   */
  argTypes: {
    title: {
      defaultValue: 'This is an alert',
    },
    text: {
      defaultValue: 'This is an alert sample text',
    },
    type: {
      control: {
        type: 'select',
        options: ['success', 'info', 'warning', 'error'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
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
    <ma-alert v-bind="$props"/>
  `,
})

export const Alert = Template.bind({})
