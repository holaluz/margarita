<style lang="scss" src="./MaDatagrid.scss"></style>

<template>
  <div class="ma-datagrid">
    <div class="ma-datagrid__container">
      <keep-alive>
        <table v-if="hasRows || isLoading">
          <ma-datagrid-head :columns="columns" @sort="handleSort" />
          <ma-datagrid-loader v-if="isLoading" :items="columns.length" />
          <ma-datagrid-body v-else :rows="rows" :columns="columns" />
        </table>
        <div v-else class="ma-datagrid__no-results" v-text="noResultsText" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MaDatagridHead from './components/MaDatagridHead'
import MaDatagridBody from './components/MaDatagridBody'
import MaDatagridLoader from './components/MaDatagridLoader'

export default {
  name: 'MaDatagrid',

  components: {
    MaDatagridHead,
    MaDatagridBody,
    MaDatagridLoader,
  },

  props: {
    rows: {
      type: Array,
      required: true,
    },

    columns: {
      type: Array,
      required: true,
      validator: (v) =>
        v.every((column) => column.name && (column.value || column.component)),
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    noResultsText: {
      type: String,
      default: 'No results.',
    },
  },

  computed: {
    hasRows() {
      return !!this.rows.length
    },
  },

  methods: {
    handleSort(sortPayload) {
      this.$emit('sort', sortPayload)
    },
  },
}
</script>
