<template>
  <tbody>
    <tr v-for="(row, i) in rows" :key="i">
      <td v-for="(column, k) in columns" :key="k">
        <template v-if="column.value">
          {{ getCellValue(row, column) }}
        </template>
        <component
          :is="column.component"
          v-bind="row"
          v-else-if="column.component"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'MaDatagridBody',

  props: {
    rows: { required: true, type: Array },
    columns: { required: true, type: Array },
  },

  methods: {
    getCellValue(row, column) {
      const { value } = column

      return typeof value === 'function' ? value(row) : row[value]
    },
  },
}
</script>

<style scoped>
tbody::before {
  position: absolute;
  top: 1%;
  left: 2%;
  box-shadow: 1px 5px 26px 12px rgba(0, 0, 0, 0.03%);
  background-color: rgba(0, 0, 0, 0.03%);
  width: calc(100% - 4%);
  height: calc(100% - 2%);
  content: '';
}
</style>
