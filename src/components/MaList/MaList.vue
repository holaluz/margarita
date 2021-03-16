<template>
  <component :is="tag" :class="iconClass">
    <items v-bind="$props" :style="computedStyle"><slot /></items>
  </component>
</template>

<script>
import { text, tones } from '../../tokens'

/**
 * Renders list following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-list--list)
 */
export default {
  name: 'MaList',

  components: {
    items: {
      functional: true,
      render(createElement, { slots, props, data }) {
        if (!slots().default) {
          // eslint-disable-next-line no-console
          console.error(`[List component] No list items found`)
          return
        }

        return slots().default.map((item) => {
          if (item.componentOptions && item.componentOptions.propsData) {
            item.componentOptions.propsData = {
              ...props,
              ...item.componentOptions.propsData,
            }
          }
          return createElement(
            'li',
            { props, style: data.style, class: props.size },
            [item]
          )
        })
      },
    },
  },

  props: {
    /**
     * Sets the type of list
     * @values bullet, check, ordered
     */

    type: {
      type: String,
      default: 'bullet',
      validator: (val) => ['bullet', 'check', 'ordered'].includes(val),
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
      default: 'gray',
      validator: (val) => Object.keys(tones).includes(val),
    },
  },

  computed: {
    tag() {
      return this.type === 'ordered' ? 'ol' : 'ul'
    },

    iconClass() {
      return this.tag === 'ul' ? this.type : null
    },

    responsiveTextSize() {
      return this.$layout.getResponsivePropValue(this.size)
    },

    computedStyle() {
      const sizeStyles =
        text.textSize[this.$layout.currentBreakpoint][this.responsiveTextSize]

      return {
        color: tones[this.tone],
        'font-size': sizeStyles['font-size'],
      }
    },
  },
}
</script>

<style scoped src="./MaList.css"></style>
