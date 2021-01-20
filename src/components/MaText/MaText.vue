<template>
  <component
    :is="tag"
    :style="computedStyle"
    :class="computedClass"
    class="ma-text"
  >
    <slot />
  </component>
</template>

<script>
import { text, tones } from '../../tokens'

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
      validator: (val) => Object.keys(text.textSize.mobile).includes(val),
    },

    italic: {
      type: Boolean,
      default: false,
    },

    bold: {
      type: Boolean,
      default: false,
    },

    tone: {
      type: String,
      default: 'neutral',
      validator: (val) => Object.keys(tones).includes(val),
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
        text.textSize[this.$layout.currentBreakpoint][this.responsiveTextSize]

      return {
        ...sizeStyles,
        color: tones[this.tone],
      }
    },
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
