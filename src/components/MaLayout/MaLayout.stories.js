import { spacing } from '@margarita/tokens'
import DemoBlock from './examples/DemoBlock'
import MaLayout from './MaLayout'
import docs from '../../../docs/components/layout/MaLayout.docs.mdx'

export default {
  title: 'Layout/Layout',
  component: MaLayout,
  args: {
    gap: 'small',
    verticalAlign: 'start',
    columns: ['12', '12 - 4 2 2 4 - 3 2 4'],
  },
  argTypes: {
    gap: {
      control: {
        type: 'select',
        options: Object.keys(spacing),
      },
      description:
        'If an array is passed, values will target the design system breakpoints',
    },
    verticalAlign: {
      control: {
        type: 'select',
        options: ['fill', 'center', 'start', 'end'],
      },
      description:
        'If an array is passed, values will target the design system breakpoints',
    },
    justify: {
      control: {
        type: 'select',
        options: ['space-around', 'space-between', 'start', 'end'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const LayoutTemplate = (args, { argTypes }) => ({
  components: { DemoBlock },
  props: Object.keys(argTypes),
  template: `
  <ma-stack space="large">
    <ma-text>Columns: {{columns}}</ma-text>
    <ma-text>Check <a href="/?path=/docs/layout-layout--layout">the docs</a> for more examples of the columns prop.</ma-text>
    <div style="background-color:#f1f1f1;width:400px">
      <ma-layout v-bind="$props">
        <demo-block v-for="i in 8" :key="i" :height="i===5 ? '5rem' : 'auto'">{{ i }}</demo-block>
      </ma-layout>
    </div>
  </ma-stack>
  `,
})

export const Layout = LayoutTemplate.bind({})
