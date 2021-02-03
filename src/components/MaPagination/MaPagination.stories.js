import { number, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docs from '../../../docs/components/MaPagination.docs.mdx'

const BUTTONS_NUMBER = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: { page: docs },
  },
}

export const Pagination = () => {
  const totalItems = number('Total items', 500)
  const itemsPerPage = number('Items per page', 25)
  const buttonsNumber = select('Number of buttons', BUTTONS_NUMBER, 5)

  return {
    template: `<ma-pagination v-bind="$props" @pagination="changePage" />`,

    props: {
      itemsPerPage: {
        default: itemsPerPage,
      },
      totalItems: {
        default: totalItems,
      },
      buttonsNumber: {
        default: buttonsNumber,
      },
    },

    methods: {
      changePage: action('clicked'),
    },
  }
}
