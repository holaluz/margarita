import { storiesOf } from '@storybook/vue'
import MaIcon from './MaIcon'
import availableIcons from './availableIcons'

storiesOf('Icons', module).add('Icons', () => ({
  components: { MaIcon },
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
      icons: availableIcons,
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
}))
