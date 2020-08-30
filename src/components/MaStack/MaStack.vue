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
      type: String,
      required: true,
      validator: (p) => validSpacing.includes(p),
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
        [`stack--space-${this.space}`]: true,
        [`stack--align-${this.align}`]: !!this.align,
      }
    },
  },
}
</script>
