import { action } from '@storybook/addon-actions'
import MaButton from '../MaButton'

export default {
  title: 'Components/Button',
  component: MaButton,
}

const actionsData = {
  click: action('click'),
}

const getProps = (argTypes) =>
  Object.values(argTypes)
    .filter((a) => a.table?.category === 'props')
    .map((a) => a.name)

const Template = (args, { argTypes }) => ({
  props: getProps(argTypes),
  methods: actionsData,
  template: `<ma-button v-bind="$props" @click="click">click me</ma-button>`,
})

export const Default = Template.bind({})
