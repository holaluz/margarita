import { gradient } from '../../../src/tokens/'
import docs from './gradients.docs.mdx'

export default {
  title: 'Tokens/Gradients',
  parameters: {
    docs: { page: docs },
  },
}

export const Gradients = () => ({
  template: `
    <ma-stack space="large">
      <div v-for="(gradient, name) in gradients" :key="name">
        <ma-heading level="4" size="xsmall">{{getName(name)}}</ma-heading>
        <ma-stack space="xsmall" :style="stackStyle">
            <div :style="getBoxStyle(gradient)" />
            <code  v-text="gradient" />
            <code>--gradient-{{name}}</code>
        </ma-stack>
      </div>
    </ma-stack>
  `,

  data() {
    return {
      gradients: gradient,
      stackStyle: {
        fontWeight: 'normal',
        fontSize: '0.75rem',
        marginTop: '1rem',
      },
      boxStyle: {
        width: '450px',
        height: '70px',
        borderRadius: '4px',
        boxShadow: '3px 2px 12px rgba(0,0,0,0.15)',
      },
    }
  },

  methods: {
    getBoxStyle(gradient) {
      return {
        ...this.boxStyle,
        background: `linear-gradient(to right, ${gradient})`,
      }
    },

    getName(name) {
      return name.split('-').join(' ')
    },
  },
})
