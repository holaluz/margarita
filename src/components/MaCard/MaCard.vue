<style lang="scss" src="./MaCard.scss"></style>

<template>
  <div v-if="hasPaddingTop" :class="spacingClasses">
    <div :class="getColorClass" class="ma-card">
      <slot />
    </div>
  </div>
  <div v-else :class="getColorClass" class="ma-card">
    <slot />
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

  computed: {
    getColorClass() {
      return `ma-card--${this.color}`
    },

    spacingClasses() {
      return {
        'ma-card--has-padding-top': this.hasPaddingTop,
      }
    },
  },
}
</script>
