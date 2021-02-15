<template>
  <div :class="['alert-banner', getClasses]">
    <span class="alert-banner__icon" />
    <ma-stack space="xsmall">
      <ma-heading v-if="title" size="xsmall" v-text="title" />
      <!-- @slot Alert content slot (Overwrites `text` when both are specified ) -->
      <slot>
        <ma-text tag="p" v-text="text" />
      </slot>
    </ma-stack>
  </div>
</template>

<script>
import MaStack from '@margarita/components/MaStack'
import MaHeading from '@margarita/components/MaHeading'
import MaText from '@margarita/components/MaText'

/**
 * Renders an alert component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-alert--alert)
 */

export default {
  name: 'MaAlert',

  components: {
    MaStack,
    MaHeading,
    MaText,
  },

  props: {
    /**
     * Sets the size of the component
     */
    size: {
      default: 'medium',
      type: String,
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    /**
     * Inner text of the component
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * Title of the component
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Sets the type of component
     */
    type: {
      type: String,
      default: 'info',
      validator: (value) =>
        ['error', 'info', 'success', 'warning'].includes(value),
    },
  },

  computed: {
    getClasses() {
      return [`alert-banner--${this.size}`, `alert-banner--${this.type}`]
    },
  },
}
</script>

<style src="./MaAlert.css"></style>
