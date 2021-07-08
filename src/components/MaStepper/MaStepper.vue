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
      validator: (val) => ['xsmall', 'small', 'medium', 'large'].includes(val),
    },
  },

  computed: {
    numberSize() {
      return `ma-stepper-number-${this.size}`
    },
  },
}
</script>

<style src="./MaStepper.css"></style>
