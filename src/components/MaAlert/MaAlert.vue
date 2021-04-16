<template>
  <div :class="['alert', `alert--${type}`]">
    <span class="icon" />
    <ma-stack space="xsmall">
      <ma-text v-if="title" bold size="medium" v-text="title" />
      <!-- @slot Alert content slot (Overwrites `text` when both are specified ) -->
      <slot>
        <ma-text size="small" v-text="text" />
      </slot>
    </ma-stack>
  </div>
</template>

<script>
import MaStack from '@margarita/components/MaStack'
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
    MaText,
  },

  props: {
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
}
</script>

<style src="./MaAlert.css"></style>
