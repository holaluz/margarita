import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import MaGridColumn from '@margarita/components/MaGridColumn'
import MaPill from '@margarita/components/MaPill/'

import MaDatagrid from './MaDatagrid'

const columns = [
  {
    title: 'Name',
    value: 'name',
    sortable: true,
  },
  {
    title: 'Age',
    value: 'age',
    sortable: true,
  },
  {
    title: 'Status',
    value: 'status',
  },
]

const rowsSample = [
  {
    name: 'Biel',
    age: 31,
    status: {
      component: MaPill,
      componentData: {
        color: 'red',
        text: 'error',
      },
    },
  },
  {
    name: 'Carlos',
    age: 29,
    status: {
      component: MaPill,
      componentData: {
        color: 'red',
        text: 'error',
      },
    },
  },
  {
    name: 'Marina',
    age: 23,
    status: {
      component: MaPill,
      componentData: {
        color: 'orange',
        text: 'warning',
      },
    },
  },
  {
    name: 'Estela',
    age: 36,
    status: {
      component: MaPill,
      componentData: {
        color: 'orange',
        text: 'warning',
      },
    },
  },
]

storiesOf('Datagrid', module)
  .addDecorator(withKnobs)
  .add('Datagrid', () => {
    const isLoading = boolean('Loading', false)

    return {
      components: {
        MaDatagrid,
        MaGridColumn,
      },

      template: `
        <ma-grid-column>
          <ma-datagrid
            :columns="columns"
            :rows="rowsSample"
            @sort="sortBy"
            :isLoading="isLoading"
          />
        </ma-grid-column>`,

      props: {
        columns: {
          default: columns,
        },
        rowsSample: {
          default: rowsSample,
        },
        isLoading: {
          default: isLoading,
        },
      },

      methods: {
        sortBy(key) {
          const sortBy = key.column.value
          const sortDirection = key.dir

          this.rowsSample.sort(this.dynamicSort(sortBy, sortDirection))
        },

        dynamicSort(key, sortDirection) {
          let sortOrder = 1
          if (sortDirection === 'DESC') {
            sortOrder = -1
          }
          return function(a, b) {
            let result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
            return result * sortOrder
          }
        },
      },
    }
  })
