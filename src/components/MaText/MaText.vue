<template>
  <component :is="tag" :class="textClass">
    <slot />
  </component>
</template>

<script>
import { fontSizes, fontTags } from '../../tokens'

export default {
  name: 'MaText',

  props: {
    tag: {
      type: String,
      default: 'span',
      validator: (tag) => fontTags.includes(tag),
    },

    size: {
      type: String,
      default: 'base',
      validator: (size) => fontSizes.includes(size),
    },
  },

  computed: {
    textClass() {
      return `text--${this.size}`
    },
  },
}
</script>

<style lang="scss" src="./MaText.scss" scoped></style>
