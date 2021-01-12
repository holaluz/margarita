<template>
  <component
    :is="tag"
    :disabled="loading || disabled"
    :class="[getClasses, 'ma-button']"
    @click="handleClick"
  >
    <!--
      @slot Default slot. Renders content unless it's loading and rounded
    -->
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
     * Size of the alert.
     * @values button, a, span
     */
    tag: {
      type: String,
      default: 'button',
    },

    /**
     * Round its borders. Use it with an icon, not with text
     */
    rounded: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Whatever descr
     * @values primary, secondary, white
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

<style scoped lang="scss" src="./MaButton.scss"></style>
