<template>
  <div>
    <div :class="`ma-pill--${tone}`" class="ma-pill" v-text="text" />
  </div>
</template>

<script>
/**
 * Renders a pill component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-pill--pill)
 */
export default {
  name: 'MaPill',

  props: {
    /**
     * Sets component's styling color tone
     */
    tone: {
      type: String,
      default: 'green',
      validator: (value) =>
        ['green', 'orange', 'red', 'gray', 'dark', 'blue', 'pink'].includes(
          value
        ),
    },

    /**
     * Sets text to be displayed
     */
    text: {
      type: [Number, String],
      default: '',
    },
  },
}
</script>

<style scoped src="./MaPill.css"></style>
