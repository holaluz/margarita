import MaHeading from '../MaHeading'

export default {
  title: 'Components/Heading',
  component: MaHeading,
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: ['none', '1', '2', '3', '4', '5', '6'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div style="display: flex;">
      <ma-heading v-bind="$props">I'M a heading</ma-heading>
      <ma-heading v-bind="$props" style="margin-left:4rem; background-color:var(--color-blue-light)">
        I'M a heading
      </ma-heading>
  </div>`,
})

export const Heading = Template.bind({})
