import { select, text } from '@storybook/addon-knobs'

import MaAlert from '@margarita/components/MaAlert'

export default {
  title: 'Components/Alert',
}

export const Alert = () => {
  const size = select('Size', ['small', 'medium', 'large'], 'small')
  const type = select('Type', ['info', 'error', 'success', 'warning'], 'info')
  const title = text('Title', 'Title')
  const content = text('Text', 'Text')

  return {
    components: { MaAlert },
    template: `
      <ma-alert
          :size="size"
          :type="type"
          :title="title"
          :text="text"
      />
    `,

    props: {
      size: {
        default: size,
      },
      type: {
        default: type,
      },
      title: {
        default: title,
      },
      text: {
        default: content,
      },
    },
  }
}
