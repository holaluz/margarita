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
      default: 'big',
      validator: (val) => ['big', 'small'].includes(val),
    },
  },

  computed: {
    numberSize() {
      return this.size === 'big'
        ? 'ma-stepper-number-big'
        : 'ma-stepper-number-small'
    },
  },
}
</script>

<style src="./MaStepper.css"></style>
