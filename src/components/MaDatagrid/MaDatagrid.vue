<style lang="scss" src="./MaDatagrid.scss"></style>

<template>
  <div class="ma-datagrid">
    <div class="ma-datagrid__container">
      <keep-alive>
        <div
          v-if="hasItems === 0 && !isLoading"
          class="ma-datagrid__no-results"
          v-text="noResultsText"
        />
        <table v-else>
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.title"
                :class="sortClass(column.value, column.sortable)"
                @click="sort(column)"
              >
                <span class="column-title" v-text="column.title" />
                <span v-if="column.sortable" class="sort-arrow" />
              </th>
            </tr>
          </thead>
          <tbody v-if="isLoading">
            <tr
              v-for="index in 3"
              :key="index"
              class="ma-datagrid__row--loader"
            >
              <td v-for="column in columns" :key="column.title">
                <ma-datagrid-loader />
              </td>
            </tr>
          </tbody>
          <tbody v-else class="ma-datagrid__shadow">
            <tr v-for="item in rows" :key="item.id">
              <td v-for="rowCell in item" :key="rowCell.keyValue">
                <span
                  :is="rowCell.component"
                  v-if="rowCell.component"
                  v-bind="rowCell.componentData"
                />
                <span v-else v-text="rowCell" />
              </td>
            </tr>
          </tbody>
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
