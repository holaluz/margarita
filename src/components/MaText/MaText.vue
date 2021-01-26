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
/**
 * This is our custom text component wich follows our design system guidelines
 */
export default {
  name: 'MaText',

  props: {
    /**
     * Sets the text element tag
     */
    tag: {
      type: String,
      default: 'span',
      validator: (val) => ['p', 'span', 'label'].includes(val),
    },

    /**
     * Sets the text element size accroding to our Design System
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['xsmall', 'small', 'medium'].includes(val),
    },

    /**
     * Applies italic style to text
     */
    italic: {
      type: Boolean,
      default: false,
    },

    /**
     * Applies bold weigth to text
     */
    bold: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets the text element color tone
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray-base
     */
    tone: {
      type: String,
      default: 'gray-dark',
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
