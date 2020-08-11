import shuffle from 'lodash.shuffle'
import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaGridContainer from '@margarita/components/MaGridContainer'
import MaPill from '@margarita/components/MaPill/'

import MaDatagrid from './MaDatagrid'

// This would be a component from the project using Margarita
const CustomPillComponent = {
  template: `<ma-pill :text="status" :color="color" />`,
  components: { MaPill },
  props: ['status'],
  computed: {
    color() {
      const options = {
        success: 'green',
        error: 'red',
        warning: 'orange',
      }
      return options[this.status]
    },
  },
}

const columns = [
  {
    name: 'User',
    sortableBy: 'name',

    // value can be a string…
    value: 'name',
  },
  {
    name: 'Age',
    sortableBy: 'age',

    // …it can also be a function (that receives the whole row)…
    value: (r) => `${r.age} years old`,
  },
  {
    name: 'Status',

    // …or we can provide a `component` which receives the whole row as props
    component: CustomPillComponent,
  },
]

const rows = [
  { name: 'Bob', age: 15, status: 'success' },
  { age: 9, name: 'Angie', status: 'error' }, // Notice that key order is not important
  { name: 'Charlie', age: 33, status: 'warning' },
]

storiesOf('Datagrid', module)
  .addDecorator(withKnobs)
  .add('Datagrid', () => {
    const isLoading = boolean('Loading', false)
    const computedRows = object('Rows', rows)

    return {
      components: {
        MaDatagrid,
        MaGridContainer,
      },

      template: `
        <ma-grid-container>
          <ma-datagrid
            :columns="columns"
            :rows="rows"
            :isLoading="isLoading"
            @sort="sortBy"
          />
        </ma-grid-container>
        `,

      data() {
        return { columns }
      },

      props: {
        rows: {
          default: computedRows,
        },
        isLoading: {
          default: isLoading,
        },
      },

      methods: {
        sortBy(payload) {
          // No, we are not sorting.
          // Oh, and don't do this. We're mutating a prop here just for
          // demonstration purposes.
          this.rows = shuffle(this.rows)

          action('sort')(payload)
        },
      },
    }
  })
