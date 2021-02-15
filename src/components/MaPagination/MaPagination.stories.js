import MaPagination from './MaPagination'
import docs from '../../../docs/components/MaPagination.docs.mdx'

export default {
  title: 'Components/Pagination',
  component: MaPagination,
  argTypes: {
    pagination: { action: 'pagination' },
  },
  parameters: {
    docs: { page: docs },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ma-pagination v-bind="$props" @pagination="pagination" />`,
})

export const Pagination = Template.bind({})
Pagination.args = {
  itemsPerPage: 25,
  totalItems: 500,
}
