<style scoped lang="scss" src="./MaButton.scss"></style>

<template>
  <component
    :is="tag"
    :disabled="loading || disabled"
    :class="[getClasses, 'ma-button']"
    @click="handleClick"
  >
    <span>
      <slot v-if="!loading || !rounded" />
      <ma-button-spinner v-if="loading" />
    </span>
  </component>
</template>

<script>
import MaButtonSpinner from './components/MaButtonSpinner'

const AVAILABLE_CATEGORIES = [
  'primary',
  'secondary',
  'white',
  'gradient',
  'no-background',
]

export default {
  name: 'ma-button',

  components: {
    MaButtonSpinner,
  },

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'button',
    },

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

    category: {
      type: String,
      default: 'primary',
      validator: v => AVAILABLE_CATEGORIES.includes(v),
    },
  },

  computed: {
    getClasses() {
      return {
        'ma-button--rounded': this.rounded,
        [`ma-button--${this.category}`]: this.category,
        'ma-button--fluid': this.fluid,
        'ma-button--loading': this.loading,
      }
    },
  },

  methods: {
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
