<template>
  <thead>
    <tr>
      <th
        v-for="column in columns"
        :key="column.name"
        :class="getColumnClasses(column)"
        @click="sortBy(column)"
      >
        <span v-text="column.name" />
        <ma-datagrid-arrow-wrapper
          v-if="column.sortableBy"
          :sorting-direction="sortingDirection"
          :is-sorting="isSortingColumn(column)"
        />
      </th>
    </tr>
  </thead>
</template>

<script>
const SORT_DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
}

const DEFAULT_SORTING_DIRECTION = SORT_DIRECTION.ASC

import MaDatagridArrowWrapper from './MaDatagridArrowWrapper'

export default {
  name: 'MaDatagridHead',

  components: {
    MaDatagridArrowWrapper,
  },

  props: {
    columns: { required: true, type: Array },
  },

  data() {
    return {
      sortingColumn: null,
      sortingDirection: DEFAULT_SORTING_DIRECTION,
    }
  },

  computed: {
    isSortedAsc() {
      return this.sortingDirection === SORT_DIRECTION.ASC
    },
  },

  methods: {
    sortBy(column) {
      if (!column.sortableBy) return

      if (this.isSortingColumn(column)) {
        this.toggleSortingDirection()
      } else {
        this.setColumnAsSortingColumn(column)
      }

      this.$emit('sort', {
        column: this.sortingColumn,
        dir: this.sortingDirection,
      })
    },

    isSortingColumn(column) {
      if (!this.sortingColumn) return false

      return this.sortingColumn.name === column.name
    },

    toggleSortingDirection() {
      this.sortingDirection = this.isSortedAsc
        ? SORT_DIRECTION.DESC
        : SORT_DIRECTION.ASC
    },

    setColumnAsSortingColumn(column) {
      this.sortingColumn = column
      this.sortingDirection = DEFAULT_SORTING_DIRECTION
    },

    getColumnClasses(column) {
      return {
        'ma-datagrid__column--sortable': !!column.sortableBy,
        'ma-datagrid__column--sorted': this.isSortingColumn(column),
      }
    },
  },
}
</script>
