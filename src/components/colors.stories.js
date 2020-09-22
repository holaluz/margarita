import merge from 'lodash.merge'
import '../scss/_margarita.scss'
import rawColors from '../../.storybook/colors.scss'

const colors = Object.entries(rawColors).reduce(
  (acc, [composedColorName, hex]) => {
    const [hue, tone] = composedColorName.split('-')
    return merge(acc, {
      [hue]: {
        [tone]: hex,
      },
    })
  },
  {}
)

export default {
  title: 'Tokens/Colors',
}

export const Colors = () => ({
  template: `
    <div :style="containerStyle">
      <div v-for="(tones, hue) in colors" :key="hue">
        <h2 :style="titleStyle">{{hue}}</h2>
        <div v-for="(hex, tone) in tones" :key="tone" :style="colorStyle">
          <div :style="getBoxStyle(hex)">
            <p :style="colorNameStyle">{{hue}} {{tone}}</p>
            <code v-text="hex" />
            <code v-text="getFunction(hue, tone)" />
          </div>
        </div>
        </div>
    </div>
  `,

  data() {
    return {
      colors,
      titleStyle: {
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 'normal',
      },
      containerStyle: {
        display: 'grid',
        gridGap: '1.5em',
        gridTemplateColumns: 'repeat(3, minmax(100px,1fr))',
        maxWidth: '800px',
        margin: '0 auto',
      },
      colorStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '0.5rem',
        textTransform: 'capitalize',
      },
      colorNameStyle: {
        margin: '0 0 1rem 0',
        fontSize: '1.2rem',
      },
      boxStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        height: '140px',
        borderRadius: '2px',
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

    getFunction(hue, tone) {
      return tone === 'base'
        ? `get-color(${hue})`
        : `get-color(${hue}, ${tone})`
    },

    getContrast(input) {
      const color = input.startsWith('#') ? input.slice(1) : input

      // Convert to RGB value
      const r = parseInt(color.substr(0, 2), 16)
      const g = parseInt(color.substr(2, 2), 16)
      const b = parseInt(color.substr(4, 2), 16)

      // Get YIQ ratio
      const yiq = (r * 299 + g * 587 + b * 114) / 1000

      // Check contrast
      return yiq >= 128 ? 'black' : 'white'
    },
  },
})
