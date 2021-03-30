<script>
/** @typedef {import('vue').VNodeData} VNodeData */
import { mergeData } from 'vue-functional-data-merge'
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'

const alignment = {
  fill: 'stretch',
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

/**
 * Renders a stack component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/layout-stack--stack)
 */
export default {
  name: 'MaStack',

  functional: true,

  props: {
    /**
     * Sets the space gap between children.
     *
     * If an array is passed, values will target the design system breakpoints.
     * ```ts
     * // This would apply medium on all the different breakpoints
     * space = 'small'
     * // This would apply none on mobile, small on tablet and large on desktop
     * :space="['none', 'small', 'large']"
     * ```
     *
     * [Spacing tokens documentation](https://holaluz.github.io/margarita/?path=/story/tokens-spacing--page)
     * @values none, xsmall, small, medium, large, xlarge, 2x-large, 3x-large, 4x-large, 5x-large, 6x-large
     */
    space: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
    },

    /**
     * Sets the children alignment. Defaults to fill.
     *
     * If an array is passed, values will target the design system breakpoints.
     * ```ts
     * // This would apply left on all the different breakpoints
     * align = 'left'
     * // This would apply fill on mobile, center on tablet and left on desktop
     * :align="['fill', 'center', 'left']"
     * ```
     * @values left, center, right, fill
     */
    align: {
      type: [Array, String],
      default: 'fill',
      validator: responsivePropValidator(Object.keys(alignment)),
    },

    /**
     * Set the HTML element tag that wraps the content.
     * @values div, ul, ol
     */
    tag: {
      type: String,
      default: 'div',
      validator: (t) => ['div', 'ul', 'ol'].includes(t),
    },
  },

  render(createElement, { parent, props, slots, data }) {
    const responsiveSpace = parent.$layout.getResponsivePropValue(props.space)
    const responsiveAlign = parent.$layout.getResponsivePropValue(props.align)

    const space = spacing[responsiveSpace]
    const align = alignment[responsiveAlign]

    /** @type {VNodeData} */
    const componentData = {
      staticClass: 'ma-stack',
      style: {
        gap: space,
        justifyItems: align,
      },
    }

    return createElement(
      props.tag,
      mergeData(data, componentData),
      slots().default
    )
  },
}
</script>

<style>
.ma-stack {
  display: grid;
  grid-auto-flow: row;
}
</style>
