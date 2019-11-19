import { storiesOf } from '@storybook/vue'
import colors from '../scss/variables/_colors.scss'

storiesOf('Colors', module).add('colors', () => ({
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
        width: '20px',
        height: '20px',
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
}))
