import { storiesOf } from '@storybook/vue'
import { withKnobs, select } from '@storybook/addon-knobs'

import MaStack, {
  validAlignments,
  validSpacing,
} from '@margarita/components/MaStack'

storiesOf('Stack', module)
  .addDecorator(withKnobs)
  .add('Stack', () => {
    const space = select('Space', validSpacing, validSpacing.medium)
    const align = select('Align', ['', ...validAlignments], '')

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
  })
  .add('Nested stack', () => {
    return {
      components: { MaStack },
      template: `
      <ma-stack space="medium" style="outline: 1px solid red;width 400px;margin:0 auto;background-color:#f1f1f2;padding:1rem">
        <ma-stack align="center" style="outline: 1px solid red">
          <span style="font-size: 2rem">Log In</span>
        </ma-stack>
        <ma-stack space="small" style="outline: 1px solid red">
          <label>email <input /></label>
          <label>password <input /></label>
          <span>reset my password</span>
          <button>entrar</button>
        </ma-stack>
      </ma-stack=>
      `,
    }
  })
