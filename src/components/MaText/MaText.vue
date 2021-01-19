<template>
  <component :is="tag" :style="computedStyle" :italic="italic" class="ma-text">
    <slot />
  </component>
</template>

<script>
import { text } from '../../tokens'
const { textSize: TEXT_SIZE, textTags: TEXT_TAGS, textStyle: TEXT_STYLE } = text
import { colorNamesList } from '@margarita/utils/colorNamesList'

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

    fromattedColor() {
      return this.color.includes('-') ? this.color : `${this.color}-base`
    },

    computedStyle() {
      const sizeStyles =
        TEXT_SIZE[this.$layout.currentBreakpoint][this.responsiveTextSize]

      return {
        ...sizeStyles,
        color: `var(--color-${this.fromattedColor})`,
        '--text-style': this.italic ? TEXT_STYLE.italic : TEXT_STYLE.normal,
      }
    },
  },
}
</script>

<style scoped>
.ma-text {
  font-style: var(--text-style);
}
</style>
