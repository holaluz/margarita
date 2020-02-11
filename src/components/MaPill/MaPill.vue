<style scoped lang="scss" src="./MaPill.scss"></style>

<template>
  <div>
    <div :class="`ma-pill--${color}`" class="ma-pill" v-text="text" />
  </div>
</template>

<script>
const AVAILABLE_COLORS = ['green', 'orange', 'red', 'gray', 'dark', 'blue']

export default {
  name: 'MaPill',

  props: {
    color: {
      type: String,
      default: 'green',
      validator: function(value) {
        return AVAILABLE_COLORS.indexOf(value) !== -1
      },
    },

    text: {
      type: [Number, String],
      default: '',
    },
  },
}
</script>
