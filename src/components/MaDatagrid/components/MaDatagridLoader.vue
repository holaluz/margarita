<style lang="scss" src="./MaDatagridLoader.scss"></style>

<template>
  <span>
    <div
      v-for="index in numberOfLoaders"
      :key="index"
      class="ma-datagrid-loader"
      :style="`width: ${Math.floor(Math.random() * 51) + 50}%;`"
    />
  </span>
</template>

<script>
export default {
  name: 'MaDatagridLoader',

  computed: {
    numberOfLoaders() {
      return Math.floor(Math.random() * 2) + 1
    },
  },
}
</script>
