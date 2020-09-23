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
            <code v-text="getFunction(hue, tone)" />
          </div>
          <p :style="colorNameStyle">
            {{hue}} {{tone}}
            <code v-text="hex" :style="hexStyle" />
          </p>
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
        fontSize: '1.4rem',
        fontWeight: 'normal',
      },
      containerStyle: {
        display: 'grid',
        gridGap: '4vw',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        maxWidth: '1400px',
        margin: '0 auto',
      },
      colorStyle: {
        marginTop: '0.5rem',
      },
      colorNameStyle: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '1rem 0 2rem 0',
        fontWeight: 'bold',
      },
      hexStyle: {
        fontWeight: 'normal',
        fontSize: '0.8rem',
      },
      boxStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '140px',
        borderRadius: '4px',
        boxShadow: '3px 2px 12px rgba(0,0,0,0.15)',
        fontSize: '0.8rem',
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
