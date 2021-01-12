const COLORS = ['green', 'orange', 'red', 'gray', 'dark', 'blue']

export default {
  title: 'Components/Pill',
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
