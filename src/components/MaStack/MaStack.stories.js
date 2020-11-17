import { select, array } from '@storybook/addon-knobs'

import MaStack from '@margarita/components/MaStack'
import MaButton from '@margarita/components/MaButton'
import MaTextField from '@margarita/components/MaTextField'
import MaAlert from '@margarita/components/MaAlert'

import { alignment, spacing } from '@margarita/tokens'

export default {
  title: 'Layout/Stack',
}

export const Stack = () => {
  const space = select('Space', spacing, spacing[5])
  const align = select('Align', [null, ...alignment], alignment[0])

  return {
    components: { MaStack },
    template: `
        <ma-stack
          :space="space"
          :align="align"
          style="background-color:#f1f1f1"
        >
        <span
          v-for="i in [1,2,3]"
          :key="i"
          style="width:200px;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem 2rem;outline:1px solid #bbb">
            {{i}}
        </span>
        </ma-stack>
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
    components: { MaStack, MaButton, MaTextField, MaAlert },
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
    components: { MaStack },
    template: `
      <div>
        <p>current breakpoint: {{ $layout.currentBreakpoint }}</p>
        <ma-stack
          :space="space"
          :align="align"
          style="background-color:#f1f1f1"
        >
        <span
          v-for="i in [1,2,3]"
          :key="i"
          style="width:200px;background-color:#dcdcdc;text-align:center;color:#212121;padding:1rem 2rem;outline:1px solid #bbb">
            {{i}}
        </span>
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
