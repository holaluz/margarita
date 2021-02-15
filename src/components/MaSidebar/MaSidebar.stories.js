import MaSidebar from './MaSidebar'
import docs from '../../../docs/components/MaSidebar.docs.mdx'

export default {
  title: 'Components/Sidebar',
  component: MaSidebar,
  args: {
    show: true,
    type: 'fixed',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['attached', 'fixed'],
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
    click: { action: 'click-overlay', table: { disable: true } },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <ma-sidebar v-bind="$props" @click-overlay="click">
      <ma-stack space="small"  style="padding: 16px;">
        <ma-heading>Sidebar</ma-heading>
        <ma-text>This is a sidebar example</ma-text>
      </ma-stack>
    </ma-sidebar>
  `,
})

export const Sidebar = Template.bind({})
