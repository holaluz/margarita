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
    shouldRenderContent() {
      const breakpoints = Object.values(breakpointsEnum)
      const currentPositionIndex = breakpoints.indexOf(
        this.$layout.currentBreakpoint
      )
      const abovePosition = breakpoints.indexOf(this.above)
      const belowPosition = breakpoints.indexOf(this.below)

      const isVisibleBelow = currentPositionIndex >= belowPosition
      const isVisibleAbove = currentPositionIndex <= abovePosition

      if (abovePosition < 0) {
        return isVisibleBelow
      }

      if (belowPosition < 0) {
        return isVisibleAbove
      }

      return isVisibleAbove && isVisibleBelow
    },
  },

  render(h) {
    const component = this.inline ? 'span' : 'div'

    return this.shouldRenderContent && this.$slots.default
      ? h(component, this.$slots.default)
      : null
  },
}
