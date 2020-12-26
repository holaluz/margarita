import icons from './availableIcons'

export default {
  title: 'Components/Icon',
}

export const Icons = () => ({
  template: `
    <div :style="containerStyle">
      <div v-for="icon in icons" :key="icon" :style="iconStyle">
        <ma-icon :icon="icon" />
        <div :style="textStyle">{{ icon }}</div>
      </div>
    </div>
  `,

  data() {
    return {
      icons,
      containerStyle: {
        display: 'grid',
        gridGap: '1.5em',
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      iconStyle: {
        display: 'flex',
      },
      textStyle: {
        opacity: 0.8,
        paddingLeft: '1em',
      },
    }
  },
})
