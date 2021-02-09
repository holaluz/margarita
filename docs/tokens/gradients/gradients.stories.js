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
        <h2 v-text="getName(name)"/>
        <ma-stack space="xsmall" :style="fontStyle">
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
      fontStyle: {
        fontWeight: 'normal',
        fontSize: '0.75rem',
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
        background: gradient,
      }
    },

    getName(name) {
      return name.split('-').join(' ')
    },
  },
})
