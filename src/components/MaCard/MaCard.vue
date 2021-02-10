<template>
  <div :class="{ 'ma-card--has-padding-top': hasPaddingTop }">
    <div :class="`ma-card--${color}`" class="ma-card">
      <slot />
    </div>
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

    /**
     * Sets card's top padding
     */
    hasPaddingTop: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style src="./MaCard.css"></style>
