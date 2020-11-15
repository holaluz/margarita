<template>
  <tbody data-testid="datagrid-loader">
    <tr v-for="i in 3" :key="i" class="loader-row">
      <td v-for="columnsIndex in items" :key="columnsIndex">
        <span>
          <div
            v-for="loader in loaders"
            :key="loader"
            :style="`width: ${Math.floor(Math.random() * 51) + 50}%;`"
            class="loader-item"
          />
        </span>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'MaDatagridLoader',

  props: {
    items: { type: Number, required: true },
  },

  data() {
    return {
      loaders: Math.floor(Math.random() * 2) + 1,
    }
  },
}
</script>

<style lang="scss" src="./MaDatagridLoader.scss"></style>
