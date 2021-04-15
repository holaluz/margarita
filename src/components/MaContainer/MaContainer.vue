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
  max-width: var(--container-size);
}

.ma-container--small {
  --container-size: 840px;
}

.ma-container--medium {
  --container-size: 1180px;
}

.ma-container--large {
  --container-size: 1370px;
}
</style>
