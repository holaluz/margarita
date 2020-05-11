<template>
  <svg height="10" width="10">
    <polygon :points="points" class="polygon" />
  </svg>
</template>

<script>
export default {
  name: 'MaDatagridLoader',

  props: {
    direction: {
      type: String,
      required: true,
    },
  },

  computed: {
    points() {
      return this.direction === 'ASC' ? '0,7 5,2 10,7' : '0,2 5,7 10,2'
    },
  },
}
</script>

<style lang="scss" scoped>
.polygon {
  fill: get-color('dark-hot-pink');
}
</style>
