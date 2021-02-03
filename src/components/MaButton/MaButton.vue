<template>
  <component
    :is="tag"
    :disabled="loading || disabled"
    :class="[getClasses, 'ma-button']"
    @click="handleClick"
  >
    <!-- @slot Button content slot -->
    <slot v-if="!loading || !rounded" />
    <ma-button-spinner v-if="loading" :style="getLoadingStyle()" />
  </component>
</template>

<script>
import MaButtonSpinner from './components/MaButtonSpinner'

export default {
  name: 'MaButton',

  components: {
    MaButtonSpinner,
  },

  props: {
    /**
     * Sets the HTML tag element of the component
     */
    tag: {
      type: String,
      default: 'button',
      validator: (tag) => ['button', 'a'].includes(tag),
    },
    /**
     * Sets the button borders to rounded style
     */
    rounded: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the button state to loading and this becomes disabled
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the button state as disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the component displaying style
     */
    category: {
      type: String,
      default: 'primary',
      validator: (v) =>
        ['primary', 'secondary', 'white', 'gradient', 'no-background'].includes(
          v
        ),
    },
  },

  computed: {
    getClasses() {
      return {
        'ma-button--rounded': this.rounded,
        [`ma-button--${this.category}`]: this.category,
        'ma-button--loading': this.loading,
      }
    },
  },

  methods: {
    handleClick(event) {
      /**
       * Click event
       * @event click
       */
      this.$emit('click', event)
    },

    getLoadingStyle() {
      const needsMargin = !this.rounded && this.$slots.default?.[0]

      return {
        marginLeft: needsMargin ? '8px' : '0',
      }
    },
  },
}
</script>

<style scoped src="./MaButton.css"></style>
