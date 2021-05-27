import MaContainer from '../MaContainer'
import docs from '../../../docs/components/layout/MaContainer.docs.mdx'

export default {
  title: 'Layout/Container',
  component: MaContainer,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-container v-bind="$props" style="background-color: var(--color-pink-base)">
    <ma-text tone="white">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices cursus magna, vel vehicula magna consequat ut. Aliquam condimentum congue sem at gravida. Suspendisse dignissim semper nunc et aliquet. Vestibulum eget massa consequat, tincidunt massa sit amet, ornare lacus. Sed arcu lectus, auctor ut turpis vel, euismod rutrum mi. Etiam sit amet mauris vel justo consequat dictum. Praesent metus est, dapibus a dui a, fringilla vehicula dolor.
    </ma-text>
  </ma-container>`,
})

export const Container = Template.bind({})
