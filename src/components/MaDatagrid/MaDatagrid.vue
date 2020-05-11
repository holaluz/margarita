<style lang="scss" src="./MaDatagrid.scss"></style>

<template>
  <div class="ma-datagrid">
    <div class="ma-datagrid__container">
      <keep-alive>
          <ma-datagrid-loader v-if="isLoading" :items="columns.length" />
        </table>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MaDatagridLoader from './components/MaDatagridLoader'

export default {
  name: 'MaDatagrid',

  components: {
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

  data() {
    return {
      currentSort: '',
      currentSortDir: 'ASC',
    }
  },

  computed: {
    hasItems() {
      return this.rows.length
    },
  },

  methods: {
    sort(column) {
      if (!column.sortable) return
      if (column === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.currentSort = column
        this.currentSortDir = 'ASC'
      }
      this.$emit('sort', { column: this.currentSort, dir: this.currentSortDir })
    },

    sortClass(value, isSortable) {
      let sortableClass = ''
      if (isSortable) {
        sortableClass = 'sort-cursor-pointer'
      }

      if (this.currentSort.value === value) {
        return `sort-arrow--${this.currentSortDir.toLowerCase()} ${sortableClass}`
      }

      return `sort-arrow--unsorted ${sortableClass}`
    },
  },
}
</script>
