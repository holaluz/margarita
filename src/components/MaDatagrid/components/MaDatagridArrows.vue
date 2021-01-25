<template>
  <span class="wrapper">
    <ma-datagrid-arrow v-if="isSorting" :direction="sortingDirection" />

    <template v-else>
      <ma-datagrid-arrow direction="ASC" />
      <ma-datagrid-arrow direction="DESC" />
    </template>
  </span>
</template>

<script>
import MaDatagridArrow from './MaDatagridArrow'

export default {
  name: 'MaDatagridArrowWrapper',

  components: {
    MaDatagridArrow,
  },

  props: {
    sortingDirection: {
      type: String,
      required: true,
    },

    isSorting: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: inline-flex;
  flex-direction: column;
  margin-left: 8px;
}
</style>
