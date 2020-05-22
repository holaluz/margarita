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
        <ma-datagrid-arrows
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

import MaDatagridArrows from './MaDatagridArrows'

export default {
  name: 'MaDatagridHead',

  components: {
    MaDatagridArrows,
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

  methods: {
    sortBy(column) {
      if (!column.sortableBy) return

      if (this.isSortingColumn(column)) {
        this.toggleSortingDirection()
      } else {
        this.setColumnAsSortingColumn(column)
      }

      this.$emit('sort', {
        sortingColumn: this.sortingColumn,
        sortingDirection: this.sortingDirection,
      })
    },

    isSortingColumn(column) {
      if (!this.sortingColumn) return false

      return this.sortingColumn.name === column.name
    },

    toggleSortingDirection() {
      this.sortingDirection =
        this.sortingDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC
    },

    setColumnAsSortingColumn(column) {
      this.sortingColumn = column
      this.sortingDirection = DEFAULT_SORTING_DIRECTION
    },

    getColumnClasses(column) {
      return {
        'ma-datagrid-head__column': true,
        'ma-datagrid-head__column--sortable': !!column.sortableBy,
        'ma-datagrid-head__column--sorted': this.isSortingColumn(column),
      }
    },
  },
}
</script>

<style lang="scss">
.ma-datagrid-head__column {
  font-weight: normal;

  &--sorted {
    font-weight: 700;
  }

  &--sortable {
    cursor: pointer;
  }
}
</style>
