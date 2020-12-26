import { select, text } from '@storybook/addon-knobs'

export default {
  title: 'Components/Alert',
}

export const Alert = () => {
  const size = select('Size', ['small', 'medium', 'large'], 'small')
  const title = text('Title', 'An alert title')
  const content = text('Text', 'Some longer alert text')

  return {
    template: `
      <ma-stack space="small" style="width:500px">
        <ma-alert :size="size" type="success" :title="title" :text="text" />
        <ma-alert :size="size" type="info" :title="title" :text="text" />
        <ma-alert :size="size" type="warning" :title="title" :text="text" />
        <ma-alert :size="size" type="error" :title="title" :text="text" />
      </ma-stack>
    `,

    props: {
      size: {
        default: size,
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
