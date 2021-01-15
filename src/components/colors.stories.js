import { color } from '../tokens'
export default {
  title: 'Tokens/Colors',
}

export const Colors = () => ({
  template: `
    <ma-stack space="large">
      <div v-for="(tones, hue) in colors" :key="hue">
        <h2 :style="titleStyle">{{hue}}</h2>
        <div :style="hueStyle">
          <div v-for="(hex, tone) in tones" :key="tone">
            <ma-stack space="xsmall" :style="hexStyle">
            <div :style="getBoxStyle(hex)" v-text="tone" />
            <code v-text="hex"  />
            <code>--color-{{hue}}-{{tone}}</code>
            </ma-stack>
          </div>
        </div>
      </div>
    </ma-stack>
  `,

  data() {
    return {
      colors: color,
      hueStyle: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      },
      hexStyle: {
        fontWeight: 'normal',
        fontSize: '0.75rem',
      },
      boxStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '150px',
        height: '70px',
        borderRadius: '4px',
        fontSize: '1rem',
        boxShadow: '3px 2px 12px rgba(0,0,0,0.15)',
      },
    }
  },

  methods: {
    getBoxStyle(color) {
      return {
        ...this.boxStyle,
        backgroundColor: color,
        color: this.getContrast(color),
      }
    },

    getContrast(color) {
      const r = parseInt(color.substr(1, 2), 16)
      const g = parseInt(color.substr(3, 2), 16)
      const b = parseInt(color.substr(5, 2), 16)

      // https://en.wikipedia.org/wiki/YIQ#From_RGB_to_YIQ
      const yiqRatio = (r * 299 + g * 587 + b * 114) / 1000

      return yiqRatio >= 128 ? 'black' : 'white'
    },
  },
})
