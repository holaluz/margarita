<template>
  <div :class="`ma-container--${size}`" class="ma-container">
    <slot />
  </div>
</template>

<script>
/**
 * Centers and horizontally pads its children.
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-container--container)
 */
export default {
  name: 'MaContainer',

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (s) => ['small', 'medium', 'large'].includes(s),
    },
  },
}
</script>

<style scoped lang="postcss">
.ma-container {
  margin: 0 auto;
  padding: 0 var(--spacing-small);
}

.ma-container--small {
  max-width: 840px;
}

.ma-container--medium {
  max-width: 1180px;
}

.ma-container--large {
  max-width: 1370px;
}
</style>
