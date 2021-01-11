import { select, array } from '@storybook/addon-knobs'

import spacingTokens from '@margarita/tokens/spacing'

export default {
  title: 'Layout/Stack',
}

const DemoBlock = {
  template: `
  <span style="width:200px;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem 2rem;outline:1px solid #bbb">
     <slot />
  </span>
  `,
}

export const Stack = () => {
  const space = select(
    'Space',
    Object.keys(spacingTokens),
    spacingTokens.medium
  )
  const align = select('Align', [null, 'left', 'center', 'right'], 'center')

  return {
    components: { DemoBlock },

    template: `
      <div style="background-color:#f1f1f1;width:600px">
        <ma-stack :space="space" :align="align">
          <demo-block v-for="i in [1,2,3]" :key="i">{{ i }}</demo-block>
        </ma-stack>
      </div>
    `,

    props: {
      space: {
        default: space,
      },
      align: {
        default: align,
      },
    },
  }
}

export const NestedStack = () => {
  return {
    template: `
      <ma-stack space="large" style="outline: 1px solid red;width 400px;margin:0 auto;background-color:#f1f1f2;padding:1rem">
        <ma-stack space="medium" align="center" style="outline: 1px solid red">
          <span style="font-size: 2rem">Log In</span>
        </ma-stack>
        <ma-stack space="xxsmall" style="outline: 1px solid red">
          <ma-text-field label="email" />
          <ma-text-field label="password" />
          <span>reset my password</span>
          <ma-button>submit</ma-button>
        </ma-stack>
        <ma-alert text="wrong password!" type="error" />
      </ma-stack>
    `,
  }
}

export const ResponsiveProps = () => {
  const space = array('Space', ['xxsmall', 'medium', 'xxlarge'])
  const align = array('Align', ['center', 'left'])

  return {
    components: { DemoBlock },

    template: `
      <div style="background-color:#f1f1f1;width:600px">
        <p>current breakpoint: {{ $layout.currentBreakpoint }}</p>
        <ma-stack :space="space" :align="align">
          <demo-block v-for="i in [1,2,3]" :key="i">{{ i }}</demo-block>
        </ma-stack>
      </div>
    `,

    props: {
      space: {
        default: space,
      },
      align: {
        default: align,
      },
    },
  }
}
