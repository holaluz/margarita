<style lang="scss" src="./LineGradient.scss"></style>

<template>
  <div
  :class="getClass"
  class= "line-gradient">
</div>
</template>

<script>
export default {
  name: 'LineGradient',

  props: {
    weight: {
      type: String
    }
  },

  data () {
    return {
      gradient: true
    }
  },

  computed: {
    getClass () {
      return `line-gradient--${this.weight}`
    }
  }
}
</script>
