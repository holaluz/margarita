<template>
  <div :class="['alert-banner', getClasses]">
    <span class="alert-banner__icon" />
    <ma-stack space="xsmall">
      <ma-heading v-if="title" size="xsmall" v-text="title" />
      <!-- @slot Alert content slot -->
      <slot>
        <ma-text v-if="text" tag="p" v-text="text" />
      </slot>
    </ma-stack>
  </div>
</template>

<script>
const AVAILABLE_SIZES = ['small', 'medium', 'large']
const AVAILABLE_TYPES = ['error', 'info', 'success', 'warning']

export default {
  name: 'MaAlert',

  props: {
    /**
     * Sets the size of the component
     */
    size: {
      default: 'medium',
      type: String,
      validator: (value) => AVAILABLE_SIZES.includes(value),
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
      validator: (value) => AVAILABLE_TYPES.includes(value),
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
