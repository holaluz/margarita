import MaHidden from './MaHidden'
import docs from '../../../docs/components/MaHidden.docs.mdx'

export default {
  title: 'Layout/Hidden',
  component: MaHidden,
  parameters: {
    docs: { page: docs },
  },
  args: {
    below: 'tablet',
    above: 'mobile',
  },
  argTypes: {
    below: {
      type: 'string',
      defaultValue: null,
      description: 'Hides the content below the desired breakpoint',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `null` },
      },
      control: {
        type: 'select',
        options: [null, 'tablet', 'desktop'],
      },
    },
    above: {
      type: 'string',
      defaultValue: null,
      description: 'Hides the content above the desired breakpoint',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `null` },
      },
      control: {
        type: 'select',
        options: ['mobile', 'tablet', null],
      },
    },
    inline: {
      type: 'boolean',
      defaultValue: false,
      description: 'Sets if content wrapper should be an inline element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` },
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-hidden v-bind="$props">
    <div v-if="$props.below">I'm hidden below {{below}}!</div>
    <div v-if="$props.above">I'm hidden above {{above}}!</div>
  </ma-hidden>`,
})

export const Hidden = Template.bind({})
