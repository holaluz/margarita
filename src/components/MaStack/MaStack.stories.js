import { spacing } from '@margarita/tokens'
import MaStack from './MaStack'
import docs from '../../../docs/components/layout/MaStack.docs.mdx'

export default {
  title: 'Layout/Stack',
  component: MaStack,
  args: {
    space: 'small',
    align: 'center',
  },
  argTypes: {
    space: {
      control: {
        type: 'select',
        options: Object.keys(spacing),
      },
      description:
        'If an array is passed, values will target the design system breakpoints',
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right', 'fill'],
      },
      description:
        'If an array is passed, values will target the design system breakpoints',
    },
    tag: {
      control: {
        type: 'select',
        options: ['div', 'section', 'ul', 'ol'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const DemoBlock = {
  template: `
  <span style="width:200px;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem 2rem;outline:1px solid #bbb">
     <slot />
  </span>
  `,
}

const StackTemplate = (args, { argTypes }) => ({
  components: { DemoBlock },
  props: Object.keys(argTypes),
  template: `
    <div style="background-color:#f1f1f1;width:600px;">
      <ma-stack v-bind="$props">
        <demo-block v-for="i in [1,2,3]" :key="i">{{ i }}</demo-block>
      </ma-stack>
    </div>
  `,
})

export const Stack = StackTemplate.bind({})

const NestedStackTemplate = (args, { argTypes }) => ({
  components: { DemoBlock },
  props: Object.keys(argTypes),
  template: `
    <div style="width: 400px;outline: 1px solid red;background-color:#f1f1f2;padding:1rem">
      <ma-stack space="2x-large">
        <div style="outline: 1px solid red">
          <ma-stack space="xlarge" align="center">
            <span style="font-size: 2rem">Log In</span>
          </ma-stack>
        </div>
        <div style="outline: 1px solid red">
          <ma-stack space="small">
            <ma-text-field label="email" />
            <ma-text-field label="password" />
            <span>reset my password</span>
            <ma-button>submit</ma-button>
          </ma-stack>
        </div>
        <div style="outline: 1px solid red">
          <ma-alert text="wrong password!" tone="yellow" />
        </div>
      </ma-stack>
    </div>
  `,
})

export const NestedStack = NestedStackTemplate.bind({})
NestedStack.argTypes = {
  space: { table: { disable: true }, control: false },
  align: { table: { disable: true }, control: false },
  default: { table: { disable: true }, control: false },
}

export const ResponsivePropsStack = StackTemplate.bind({})
ResponsivePropsStack.argTypes = {
  space: {
    control: {
      type: 'array',
    },
  },
  align: {
    control: {
      type: 'array',
    },
  },
}
ResponsivePropsStack.args = {
  space: ['xsmall', 'medium', '3x-large'],
  align: ['center', 'left'],
}
