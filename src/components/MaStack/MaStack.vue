<style lang="scss" src="./MaStack.scss" scoped></style>

<template>
  <component :is="component" :class="classes" class="stack">
    <slot />
  </component>
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
      default: alignment[0],
      validator: responsivePropValidator(alignment),
    },

    component: {
      type: String,
      default: 'div',
      validator: (p) => ['div', 'ol', 'ul'].includes(p),
    },
  },

  computed: {
    computedSpace() {
      return this.$layout.getResponsivePropValue(this.space)
    },

    computedAlign() {
      return this.$layout.getResponsivePropValue(this.align)
    },

    classes() {
      return [
        `stack--space-${this.computedSpace}`,
        `stack--align-${this.computedAlign}`,
      ]
    },
  },
}
</script>
