import docs from '../../../docs/components/MaPill.docs.mdx'

const COLORS = ['green', 'orange', 'red', 'gray', 'dark', 'blue']

export default {
  title: 'Components/Pill',
  parameters: {
    docs: { page: docs },
  },
}

export const Pill = () => {
  return {
    template: `
      <ma-stack space="small">
        <ma-pill v-for="color in colors" :key="color" :color="color" :text="color" />
      </ma-stack>
    `,

    data() {
      return { colors: COLORS }
    },
  }
}
