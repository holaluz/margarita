import colors from '../scss/_margarita.scss'

export default {
  title: 'Tokens/Colors',
}

export const Colors = () => ({
  template: `
    <div :style="containerStyle">
      <div
        v-for="(color, colorName) in colors"
        :key="color"
        :style="colorContainerStyle"
      >
        <div :style="getColorStyle(color)"></div>
        <div :style="textStyle">
          <b>{{ colorName }}</b><br>
          <small>({{ color }})</small>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      colors,
      containerStyle: {
        display: 'grid',
        gridGap: '1.5em',
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      colorContainerStyle: {
        display: 'flex',
        alignItems: 'center',
      },
      colorStyle: {
        width: '4vw',
        height: '4vw',
        borderRadius: '2px',
      },
      textStyle: {
        opacity: 0.8,
        paddingLeft: '.5em',
      },
    }
  },

  methods: {
    getColorStyle(backgroundColor) {
      return {
        ...this.colorStyle,
        backgroundColor,
      }
    },
  },
})
