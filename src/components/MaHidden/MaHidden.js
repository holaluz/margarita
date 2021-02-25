import { breakpointsEnum } from '../../tokens'

/**
 * Renders a component that hides its children according to the Design System breakpoints.
 *
 * Beware that at least one of both `below` and `above` properties must be set
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/layout-hidden--hidden)
 */
export default {
  name: 'MaHidden',

  props: {
    /**
     * Hides the content below the desired breakpoint
     * @values tablet, desktop
     */
    below: {
      type: String,
      default: null,
      validator: (v) =>
        [null, breakpointsEnum.tablet, breakpointsEnum.desktop].includes(v),
    },

    /**
     * Hides the content above the desired breakpoint
     * @values mobile, tablet
     */
    above: {
      type: String,
      default: null,
      validator: (v) =>
        [breakpointsEnum.mobile, breakpointsEnum.tablet, null].includes(v),
    },

    /**
     * Sets if content should be displaced inline
     */
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
