<template>
  <div
    :style="styles"
    :class="[`stack--align-${responsiveAlign}`]"
    class="stack"
  >
    <slot />
  </div>
</template>

<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'
const alignment = ['left', 'center', 'right', 'fill']

export default {
  name: 'MaStack',

  props: {
    /**
     * Sets the space gap between children.
     * @values none, xsmall, small, medium, large, xlarge, 2x-large, 3x-large, 4x-large, 5x-large, 6x-large
     */
    space: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
    },

    /**
     * Set the children alignment. Defaults to fill.
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
