<template>
  <div :class="{ 'ma-card--has-padding-top': hasPaddingTop }">
    <div :class="`ma-card--${color}`" class="ma-card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaCard',

  props: {
    color: {
      type: String,
      default: 'gray',
    },

    hasPaddingTop: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" src="./MaCard.scss"></style>
