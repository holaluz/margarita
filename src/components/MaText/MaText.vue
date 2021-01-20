<template>
  <component
    :is="tag"
    :key="tone"
    :style="computedStyle"
    :class="computedClass"
    class="ma-text"
  >
    <slot />
  </component>
</template>

<script>
import { text, color } from '../../tokens'
const { textSize: TEXT_SIZE } = text

const TEXT_TAGS = ['p', 'span', 'label']

export default {
  name: 'MaText',

  props: {
    tag: {
      type: String,
      default: 'span',
      validator: (val) => TEXT_TAGS.includes(val),
    },

    size: {
      type: String,
      default: 'medium',
      validator: (val) => Object.keys(TEXT_SIZE.mobile).includes(val),
    },

    italic: {
      type: Boolean,
      default: false,
    },

    bold: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'gray',
      validator: (val) => Object.keys(color).includes(val),
    },

    tone: {
      type: String,
      default: 'base',
    },
  },

  computed: {
    responsiveTextSize() {
      return this.$layout.getResponsivePropValue(this.size)
    },

    computedClass() {
      return {
        'ma-text--italic': this.italic,
        'ma-text--bold': this.bold,
      }
    },

    computedStyle() {
      const sizeStyles =
        TEXT_SIZE[this.$layout.currentBreakpoint][this.responsiveTextSize]

      return {
        ...sizeStyles,
        color: `var(--color-${this.color}-${this.tone})`,
      }
    },
  },

  mounted() {
    if (!(this.tone in color[this.color])) {
      // eslint-disable-next-line no-console
      console.warn(
        `'${this.tone}' tone does not exist for color '${
          this.color
        }'. Please check the valid values: ${Object.keys(color[this.color])}`
      )
    }
  },
}
</script>

<style scoped>
.ma-text {
  padding: 0;
  margin: 0;
  font-weight: normal;
}

.ma-text--italic {
  font-style: italic;
}

.ma-text--bold {
  font-weight: bold;
}
</style>
