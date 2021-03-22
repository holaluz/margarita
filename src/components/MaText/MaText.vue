<template>
  <component
    :is="tag"
    :style="computedStyle"
    :class="computedClass"
    class="ma-text"
  >
    <!-- @slot Text content slot -->
    <slot />
  </component>
</template>

<script>
import { text, tones } from '../../tokens'
/**
 * Renders text following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-text--text)
 */
export default {
  name: 'MaText',

  props: {
    /**
     * Set the HTML element tag to ensure the document semantics are meaningful
     */
    tag: {
      type: String,
      default: 'span',
      validator: (val) => ['p', 'span', 'label'].includes(val),
    },

    /**
     * Sets the text element size according to our Design System
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
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray
     */
    tone: {
      type: String,
      default: 'gray-dark',
      validator: (val) => Object.keys(tones).includes(val),
    },
    /**
     * Set an horitzontal alignment to the text
     */
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value),
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
        'font-size': sizeStyles['font-size'],
        'line-height': sizeStyles['line-height'],
        '--top-crop': sizeStyles['top-crop'],
        '--bottom-crop': sizeStyles['bottom-crop'],
        'text-align': this.align,
        color: tones[this.tone],
      }
    },
  },
}
</script>

<style scoped src="./MaText.css"></style>
