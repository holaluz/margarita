<template>
  <div :style="styles" :class="classes" class="stack">
    <slot />
  </div>
</template>

<script>
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { spacing } from '../../tokens'
const alignment = ['left', 'center', 'right']

export default {
  name: 'MaStack',

  props: {
    space: {
      type: [Array, String],
      required: true,
      validator: responsivePropValidator(Object.keys(spacing)),
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
        [`stack--align-${this.responsiveAlign}`]: this.align,
      }
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
