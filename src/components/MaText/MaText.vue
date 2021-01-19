<template>
  <component
    :is="tag"
    :style="computedStyle"
    :class="computedClass"
    :italic="italic"
    class="ma-text"
  >
    <slot />
  </component>
</template>

<script>
import { text } from '../../tokens'
const { textSize: TEXT_SIZE } = text
import { colorNamesList } from '@margarita/utils/colorNamesList'

const TEXT_TAGS = ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default {
  name: 'MaText',
  props: {
    tag: {
      type: String,
      default: 'span',
      validator: (tag) => TEXT_TAGS.includes(tag),
    },
    size: {
      type: String,
      default: 'medium',
      validator: (size) => Object.keys(TEXT_SIZE.mobile).includes(size),
    },

    italic: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'gray-dark',
      validator: (val) => {
        const [color, tone] = val.split('-')
        return colorNamesList.includes(`${color}-${tone || 'base'}`)
      },
    },
  },
  computed: {
    responsiveTextSize() {
      return this.$layout.getResponsivePropValue(this.size)
    },

    formattedColor() {
      return this.color.includes('-') ? this.color : `${this.color}-base`
    },

    computedClass() {
      return {
        'ma-text--italic': this.italic,
      }
    },

    computedStyle() {
      const sizeStyles =
        TEXT_SIZE[this.$layout.currentBreakpoint][this.responsiveTextSize]

      return {
        ...sizeStyles,
        color: `var(--color-${this.formattedColor})`,
      }
    },
  },
}
</script>

<style scoped>
.ma-text {
  padding: 0;
  margin: 0;
}

.ma-text--italic {
  font-style: italic;
}
</style>
