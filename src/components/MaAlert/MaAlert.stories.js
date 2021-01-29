import { select, text } from '@storybook/addon-knobs'
import docs from '../../../docs/components/MaAlert.docs.mdx'

export default {
  title: 'Components/Alert',
  decorators: [
    () => ({
      template: '<div style="width:600px"><story/></div>',
    }),
  ],
  parameters: {
    docs: { page: docs },
  },
}

const TYPES = ['success', 'info', 'warning', 'error']

export const Alert = () => {
  const size = select('Size', ['small', 'medium', 'large'], 'small')
  const content = text('Text', 'A longer alert text')

  return {
    template: `
      <ma-stack space="small">
        <ma-alert
          v-for="type in types"
          :key="type"
          :type="type"
          :title="type"
          v-bind="$props"
        />
      </ma-stack>
    `,

    data() {
      return {
        types: TYPES,
      }
    },

    props: {
      size: {
        default: size,
      },
      text: {
        default: content,
      },
    },
  }
}
