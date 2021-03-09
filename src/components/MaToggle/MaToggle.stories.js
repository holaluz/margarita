import MaToggle from './MaToggle'
import docs from '../../../docs/components/MaToggle.docs.mdx'

export default {
  title: 'Components/Toggle',
  component: MaToggle,
  argTypes: {},
  parameters: {
    docs: { page: docs },
  },
}

const ToggleTemplate = (args, { argTypes }) => {
  return {
    data: () => ({
      isChecked: true,
    }),
    props: Object.keys(argTypes),
    template: `
        <div>
            <ma-toggle v-model="isChecked" v-bind="$props" id="toggle" label="Mostrar CUPS" />
        </div>
        `,
  }
}

export const Toggle = ToggleTemplate.bind({})
