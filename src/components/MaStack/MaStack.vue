<style lang="scss" src="./MaStack.scss" scoped></style>

<template>
  <component :is="component" :class="classes" class="stack">
    <slot />
  </component>
</template>

<script>
export const validSpacing = [
  'none',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
]

export const validAlignment = ['start', 'center', 'end']

import { getResponsivePropValue } from '../../utils/getResponsivePropValue'

export default {
  name: 'MaStack',

  props: {
    space: {
      type: [Array, String],
      required: true,
      validator: (value) => {
        if (Array.isArray(value))
          return value.every((v) => validSpacing.includes(v))

        return validSpacing.includes(value)
      },
    },

    align: {
      type: String,
      default: '',
      validator: (p) => !p || validAlignment.includes(p),
    },

    component: {
      type: String,
      default: 'div',
      validator: (p) => ['div', 'ol', 'ul'].includes(p),
    },
  },
  computed: {
    classes() {
      return {
        [`stack--space-${getResponsivePropValue(
          this.space,
          this.$layout.currentBreakpoint
        )}`]: true,
        // [`stack--align-${getResponsivePropValue(
        //   this.align,
        //   this.$layout.currentBreakpoint
        // )}`]: !!this.align,
      }
    },
  },
}
</script>
