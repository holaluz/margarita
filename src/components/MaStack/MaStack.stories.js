import { storiesOf } from '@storybook/vue'
import { withKnobs, select } from '@storybook/addon-knobs'

import MaStack from './MaStack'

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add('Stack', () => ({
    components: { MaStack },

    template: `
      <div :style="container">
        <ma-stack
          :vertical="vertical"
          :horizontal="horizontal"
        >
          <div :style="exampleContent">
            Content
          </div>
          <div :style="exampleContent">
            More content
          </div>
          <div :style="exampleContent">
            Even longer content
          </div>
        </ma-stack>
      </div>`,

    props: {
      vertical: {
        default: select('Vertical', ['top', 'center', 'bottom', 'fill']),
      },
      horizontal: {
        default: select('Horizontal', ['fill', 'left', 'center', 'right']),
      },
    },

    data() {
      return {
        exampleContent: {
          background: 'cyan',
          padding: '1rem',
          margin: '1rem',
        },
        container: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }
    },
  }))
