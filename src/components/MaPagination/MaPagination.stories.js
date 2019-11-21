import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MaPagination from '@margarita/components/MaPagination'

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .add('Pagination', () => {
    const totalItems = number('Total items', 500)
    const itemsPerPage = number('Items per page', 25)

    return {
      components: { MaPagination },

      template: `
        <div>
          <ma-pagination
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
      },

      methods: {
        changePage: action('clicked'),
      },
    }
  })
