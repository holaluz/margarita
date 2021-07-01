<template>
  <ma-stack space="large" class="ma-stepper" :class="numberSize">
    <slot />
  </ma-stack>
</template>

<script>
export default {
  name: 'MaStepper',

  props: {
    /**
     * Sets the size of the number
     */
    size: {
      type: String,
      default: 'large',
      validator: (val) => ['large', 'small'].includes(val),
    },
  },

  computed: {
    numberSize() {
      return this.size === 'large'
        ? 'ma-stepper-number-large'
        : 'ma-stepper-number-small'
    },
  },
}
</script>

<style src="./MaStepper.css"></style>
