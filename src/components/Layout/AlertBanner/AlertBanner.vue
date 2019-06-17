<style lang="scss" src="./AlertBanner.scss"></style>

<template>
  <div :class="getClasses" class="alert-banner">
    <span class="alert-banner__icon" />
    <div class="alert-banner__content">
      <p v-if="title" class="alert-banner__title" v-text="title" />
      <slot>
        <p class="alert-banner__text" v-text="text" />
      </slot>
    </div>
  </div>
</template>

<script>
const AVAILABLE_SIZES = ['small', 'medium', 'large']
const AVAILABLE_TYPES = ['error', 'info', 'success', 'warning']

export default {
  name: 'AlertBanner',

  props: {
    size: {
      default: 'medium',
      type: String,
      validator: function(value) {
        return AVAILABLE_SIZES.indexOf(value) !== -1
      },
    },

    text: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'info',
      validator: function(value) {
        return AVAILABLE_TYPES.indexOf(value) !== -1
      },
    },
  },

  computed: {
    getClasses() {
      const classes = []

      classes.push(`alert-banner--${this.size}`)
      classes.push(`alert-banner--${this.type}`)

      return classes
    },
  },
}
</script>
