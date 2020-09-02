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

export default {
  name: 'MaStack',

  props: {
    space: {
      type: [Array, String],
      required: true,
      validator: (value) => {
        return Array.isArray(value)
          ? value.every((v) => validSpacing.includes(v))
          : validSpacing.includes(value)
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
    computedSpace() {
      return this.$layout.getResponsivePropValue(this.space)
    },

    computedAlign() {
      return this.$layout.getResponsivePropValue(this.align)
    },

    classes() {
      return {
        [`stack--space-${this.computedSpace}`]: true,
        [`stack--align-${this.computedAlign}`]: !!this.align,
      }
    },
  },
}
</script>
