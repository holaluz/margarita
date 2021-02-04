<template>
  <component :is="headingTag" :style="computedStyle" class="ma-heading">
    <slot />
  </component>
</template>

<script>
import { headings, tones } from '../../tokens'
const { headingSize } = headings
/**
 * Renders heading following the Design System guidelines
 */
export default {
  name: 'MaHeading',

  props: {
    /**
     * Set the HTML element tag to ensure the document semantics are meaningful by specifying its level
     */
    level: {
      type: String,
      default: 'none',
      validator: (val) => ['none', '1', '2', '3', '4', '5', '6'].includes(val),
    },

    /**
     * Sets the text element size accroding to our Design System
     * @values xsmall, small, medium, large, xlarge
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => Object.keys(headingSize.mobile).includes(val),
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
  },

  computed: {
    headingTag() {
      return this.level === 'none' ? 'div' : `h${this.level}`
    },

    responsiveHeadingSize() {
      return this.$layout.getResponsivePropValue(this.size)
    },

    computedStyle() {
      const sizeStyles =
        headingSize[this.$layout.currentBreakpoint][this.responsiveHeadingSize]

      return {
        'font-size': sizeStyles['font-size'],
        'line-height': sizeStyles['line-height'],
        '--top-crop': sizeStyles['top-crop'],
        '--bottom-crop': sizeStyles['bottom-crop'],
        color: tones[this.tone],
      }
    },
  },
}
</script>

<style scoped src="./MaHeading.css"></style>
