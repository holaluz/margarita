import docs from '../../../docs/components/MaDataGrid.docs.mdx'
import MaDatagrid from './MaDatagrid'

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
    component: {
      template: `<ma-pill :text="status" :color="color" />`,
      props: ['status'],
      computed: {
        color() {
          const options = { success: 'green', error: 'red', warning: 'orange' }
          return options[this.status]
        },
      },
    },
  },
]

const rows = [
  { name: 'Bob', age: 15, status: 'success' },
  { age: 9, name: 'Angie', status: 'error' }, // Notice that key order is not important
  { name: 'Charlie', age: 33, status: 'warning' },
]

export default {
  title: 'Components/Datagrid',
  decorators: [
    () => ({
      template: '<div style="width:600px"><story/></div>',
    }),
  ],
  component: MaDatagrid,
  argTypes: {
    sort: { action: 'sort' },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-datagrid v-bind="$props" :columns="columns" @sort="sort" />`,
})

export const Datagrid = Template.bind({})
Datagrid.args = {
  columns,
  rows,
}
