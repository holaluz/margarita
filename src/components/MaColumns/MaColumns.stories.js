import { spacing } from '@margarita/tokens'
import MaColumns from './MaColumns'
import docs from '../../../docs/components/MaColumns.docs.mdx'

export default {
  title: 'Layout/Columns',
  component: MaColumns,
  args: {
    gap: 'small',
    verticalAlign: 'start',
    columns: ['12', '4 2 2 4', '3 2 4 3'],
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
        options: ['space-around', 'space-between', 'start', 'end'],
      },
      description:
        'If an array is passed, values will target the design system breakpoints',
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const DemoBlock = {
  template: `
  <span style="width: 100%;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem 1rem;outline:1px solid #bbb">
     <slot />
  </span>
  `,
}

const ColumnsTemplate = (args, { argTypes }) => ({
  components: { DemoBlock },
  props: Object.keys(argTypes),
  template: `
  <ma-stack space="large">
    <ma-text>Columns: {{columns}}</ma-text>
    <div style="background-color:#f1f1f1;width:400px">
      <ma-columns v-bind="$props">
        <demo-block v-for="i in 8" :key="i">{{ i }}</demo-block>
      </ma-columns>
    </div>
  </ma-stack>
  `,
})

export const Columns = ColumnsTemplate.bind({})
