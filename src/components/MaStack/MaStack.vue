<style lang="scss" src="./MaStack.scss" scoped></style>

<template>
  <div :class="classes" class="stack">
    <slot />
  </div>
</template>

<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing, alignment } from '../../tokens'

export default {
  name: 'MaStack',

  props: {
    space: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(spacing),
    },

    align: {
      type: [Array, String],
      default: null,
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

    classes() {
      return {
        [`stack--space-${this.responsiveSpace}`]: true,
        [`stack--align-${this.responsiveAlign}`]: this.align,
      }
    },
  },
}
</script>
