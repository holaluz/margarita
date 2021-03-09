<template>
  <component :is="tag" :class="iconClass">
    <li
      v-for="(listItem, index) in listItems"
      :key="index"
      :style="computedStyle"
    >
      <ma-text tag="p" :size="size" :tone="tone">
        {{ listItem }}
      </ma-text>
    </li>
  </component>
</template>

<script>
import MaText from '@margarita/components/MaText'
import { tones } from '../../tokens'
/**
 * Renders text following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-text--text)
 */
export default {
  name: 'MaTextList',

  components: {
    MaText,
  },

  props: {
    /**
     * Set the HTML element tag to ensure the document semantics are meaningful
     */
    tag: {
      type: String,
      default: 'ul',
      validator: (val) => ['ul', 'ol'].includes(val),
    },

    /**
     * Sets the text element size according to our Design System
     */
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium'].includes(val),
    },

    /**
     * Sets the text element color tone
     * @values white, red, pink, blue, green, yellow, gray-darker, gray-dark, gray
     */
    tone: {
      type: String,
      default: 'blue',
      validator: (val) => Object.keys(tones).includes(val),
    },

    /**
     * Sets the icon of the items
     * @values bullet, check
     */
    icon: {
      type: String,
      default: 'bullet',
      validator: (val) => ['bullet', 'check'].includes(val),
    },

    /**
     * Sets the content of the items
     */
    listItems: {
      type: Array,
      required: true,
    },
  },

  computed: {
    iconClass() {
      return `${this.icon}`
    },
    computedStyle() {
      return {
        color: tones[this.tone],
      }
    },
  },
}
</script>

<style scoped src="./MaTextList.css"></style>
