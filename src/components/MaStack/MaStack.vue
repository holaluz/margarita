<template>
  <div
    :style="styles"
    :class="[`stack--align-${responsiveAlign}`]"
    class="stack"
  >
    <!-- @slot Stack content slot -->
    <slot />
  </div>
</template>

<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'
const alignment = ['left', 'center', 'right', 'fill']

/**
 * Renders a stack component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/layout-stack--stack)
 */
export default {
  name: 'MaStack',

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
      validator: responsivePropValidator(alignment),
    },
  },

  computed: {
    responsiveSpace() {
      return this.$layout.getResponsivePropValue(this.space)
    },

    responsiveAlign() {
      return this.$layout.getResponsivePropValue(this.align)
    },

    styles() {
      return { gap: spacing[this.responsiveSpace] }
    },
  },
}
</script>

<style scoped>
.stack {
  display: grid;
  grid-auto-flow: row;
}

.stack--align-fill {
  justify-items: stretch;
}

.stack--align-left {
  justify-items: flex-start;
}

.stack--align-center {
  justify-items: center;
}

.stack--align-right {
  justify-items: flex-end;
}
</style>
