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
import { responsivePropValidator } from '@margarita/utils/responsivePropValidator'
import { colorPropValidator } from '@margarita/utils/colorPropValidator'
import { text } from '../../tokens'
const { textSize: TEXT_SIZE } = text

const TEXT_TAGS = ['p', 'span', 'label']

export default {
  name: 'MaText',

  props: {
    tag: {
      type: String,
      default: 'span',
      validator: responsivePropValidator(TEXT_TAGS),
    },

    size: {
      type: String,
      default: 'small',
      validator: responsivePropValidator(Object.keys(TEXT_SIZE.mobile)),
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
      default: 'gray-dark',
      validator: colorPropValidator,
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
        'ma-text--bold': this.bold,
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
  font-weight: normal;
}

.ma-text--italic {
  font-style: italic;
}

.ma-text--bold {
  font-weight: bold;
}
</style>
