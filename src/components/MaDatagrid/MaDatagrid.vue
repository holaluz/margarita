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
/**
 * Renders a datagrid component following the Design System guidelines
 *
 * [Component's API documentation](https://holaluz.github.io/margarita/?path=/story/components-datagrid--datagrid)
 */
export default {
  name: 'MaDatagrid',

  components: {
    MaDatagridHead,
    MaDatagridBody,
    MaDatagridLoader,
  },

  props: {
    /**
     * Sets the datagrid rows
     */
    rows: {
      type: Array,
      required: true,
    },

    /**
     * Sets the datagrid columns.
     *
     * If `column.value` not present, `column.component` is required, and viceversa.
     * ```ts
     *   <{
     *    name: string,
     *    value?: any,
     *    component?: VueComponent
     *   }[]>
     * ```
     */
    columns: {
      type: Array,
      required: true,
      validator: (v) =>
        v.every((column) => column.name && (column.value || column.component)),
    },

    /**
     * Sets the is loading status
     */
    isLoading: {
      type: Boolean,
      default: false,
    },

    /**
     * Displayed text when no data is displayed
     */
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

<style src="./MaDatagrid.css"></style>
