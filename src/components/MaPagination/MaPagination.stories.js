import { number, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaPagination from '@margarita/components/MaPagination'

const BUTTONS_NUMBER = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default {
  title: 'Components/Pagination',
}

export const Pagination = () => {
  const totalItems = number('Total items', 500)
  const itemsPerPage = number('Items per page', 25)
  const buttonsNumber = select('Number of buttons', BUTTONS_NUMBER, 5)

  return {
    components: { MaPagination },

    template: `
        <div>
          <ma-pagination
            :buttons-number="buttonsNumber"
            :items-per-page="itemsPerPage"
            :total-items="totalItems"
            @pagination="changePage"
          >
          </ma-pagination>
        </div>`,

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
