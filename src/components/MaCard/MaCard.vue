<template>
  <div :class="`ma-card--${color}`" class="ma-card">
    <slot />
  </div>
</template>

<script>
/**
 * Renders a card component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-card--card)
 */
export default {
  name: 'MaCard',

  props: {
    /**
     * Sets card background color
     * @values white, gray
     */
    color: {
      type: String,
      default: 'gray',
      validator: (val) => ['white', 'gray'].includes(val),
    },
  },
}
</script>

<style src="./MaCard.css"></style>
