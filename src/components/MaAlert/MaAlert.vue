<template>
  <div :class="['alert-banner', getClasses]">
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
  name: 'MaAlert',

  props: {
    size: {
      default: 'medium',
      type: String,
      validator: (value) => AVAILABLE_SIZES.includes(value),
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

<style lang="scss" src="./MaAlert.scss"></style>
