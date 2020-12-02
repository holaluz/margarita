import { breakpointsEnum } from '../../tokens'

export default {
  name: 'MaHidden',

  props: {
    below: {
      type: String,
      default: null,
      validator: (v) =>
        [null, breakpointsEnum.tablet, breakpointsEnum.desktop].includes(v),
    },

    above: {
      type: String,
      default: null,
      validator: (v) =>
        [breakpointsEnum.mobile, breakpointsEnum.tablet, null].includes(v),
    },

    inline: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    if (!this.below && !this.above) {
      // eslint-disable-next-line no-console
      console.warn(
        `neither 'below' nor 'above' prop were provided. Please provide at least one`
      )
    }
  },

  computed: {
    breakpointValues() {
      return Object.values(breakpointsEnum)
    },

    currentPositionIndex() {
      return this.breakpointValues.indexOf(this.$layout.currentBreakpoint)
    },

    shouldRenderContent() {
      const abovePosition = this.breakpointValues.indexOf(this.above)
      const belowPosition = this.breakpointValues.indexOf(this.below)

      const isVisibleBelow = this.currentPositionIndex >= belowPosition
      const isVisibleAbove = this.currentPositionIndex <= abovePosition

      if (abovePosition > 0) {
        return isVisibleAbove
      }

      if (belowPosition > 0) {
        return isVisibleBelow
      }

      return isVisibleAbove && isVisibleBelow
    },
  },

  render(h) {
    const component = this.inline ? 'span' : 'div'

    return this.$slots.default && this.shouldRenderContent
      ? h(component, this.$slots.default)
      : null
  },
}
