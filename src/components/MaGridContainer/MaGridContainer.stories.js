import './stories.scss'
import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs'

import MaGridContainer from '@margarita/components/MaGridContainer'
import MaGridRow from '@margarita/components/MaGridRow'
import MaGridColumn from '@margarita/components/MaGridColumn'
import MaText from '@margarita/components/MaText'
import MaSelect from '@margarita/components/MaSelect'
import MaCard from '@margarita/components/MaCard'

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .add('Grid', () => {
    const fluid = boolean('Fluid layout', false)
    const tag = select(
      'Tag',
      ['div', 'header', 'aside', 'article', 'section'],
      'div'
    )
    const noGutters = boolean('No gutters', false)

    return {
      components: { MaGridContainer, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-container :fluid="fluid" :tag="tag" class="grid-example">
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 1" :key="col" class="ma-grid-col--12">
              <div class="content px0">12</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 2" :key="col" class="ma-grid-col--6">
              <div class="content px0">6</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 3" :key="col" class="ma-grid-col--4">
              <div class="content px0">4</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 4" :key="col" class="ma-grid-col--3">
              <div class="content px0">3</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 6" :key="col" class="ma-grid-col--2">
              <div class="content px0">2</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column v-for="col in 12" :key="col" class="ma-grid-col--1">
              <div class="content px0">1</div>
            </ma-grid-column>
          </ma-grid-row>
        </ma-grid-container>
      `,

      props: {
        fluid: {
          default: fluid,
        },
        tag: {
          default: tag,
        },
        noGutters: {
          default: noGutters,
        },
      },
    }
  })
  .add('Offset', () => {
    const fluid = boolean('fluid', false)
    const noGutters = boolean('noGutters', false)

    return {
      components: { MaGridContainer, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-container :fluid="fluid" class="grid-example">
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column class="ma-grid-col--10 ma-grid-col--offset-2">
              <div class="content">grid-col--10 ma-grid-col--offset-2</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--4 ma-grid-col--offset-5 ma-grid-col--md-offset-3">
              <div class="content">grid-col--4 ma-grid-col--(offset-5 | md-offset-3)</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--md-4 ma-grid-col--md-offset-1">
              <div class="content">grid-col--12 ma-grid-col--md-4 ma-grid-col--md-offset-1</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-7 ma-grid-col--sm-offset-1">
              <div class="content">grid-col--12 ma-grid-col--(sm-6 | md-7) ma-grid-col--sm-offset-1</div>
            </ma-grid-column>
          </ma-grid-row>
        </ma-grid-container>
      `,

      props: {
        fluid: {
          default: fluid,
        },
        noGutters: {
          default: noGutters,
        },
      },
    }
  })
  .add('Order', () => {
    const fluid = boolean('fluid', false)
    const noGutters = boolean('noGutters', false)

    return {
      components: { MaGridContainer, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-container :fluid="fluid" class="grid-example">
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column class="ma-grid-col--6 ma-grid-col--lg-order-2">
              <div class="content">#1</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--6">
              <div class="content">#2</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column class="ma-grid-col--4 ma-grid-col--md-order-2 ma-grid-col--order-1">
              <div class="content">#1</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--4 ma-grid-col--md-order-3 ma-grid-col--order-2">
              <div class="content">#2</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--4 ma-grid-col--md-order-1 ma-grid-col--order-3">
              <div class="content">#3</div>
            </ma-grid-column>
          </ma-grid-row>
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3 ma-grid-col--md-order-4 ma-grid-col--sm-order-2">
              <div class="content">#1</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3 ma-grid-col--md-order-3 ma-grid-col--sm-order-1">
              <div class="content">#2</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3 ma-grid-col--md-order-2 ma-grid-col--sm-order-4">
              <div class="content">#3</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3 ma-grid-col--md-order-1 ma-grid-col--sm-order-3">
              <div class="content">#4</div>
            </ma-grid-column>
          </ma-grid-row>
        </ma-grid-container>
      `,

      props: {
        fluid: {
          default: fluid,
        },
        noGutters: {
          default: noGutters,
        },
      },
    }
  })
  .add('Nested', () => {
    const fluid = boolean('fluid', false)
    const noGutters = boolean('noGutters', false)
    const directionColumn = boolean(
      'Light blue row has flex direction column',
      true
    )

    return {
      components: { MaGridContainer, MaGridRow, MaGridColumn },

      template: `
        <ma-grid-container :fluid="fluid" class="grid-example">
          <ma-grid-row :noGutters="noGutters">
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-4">
              <div class="content">{{ lorem }}</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3" :directionColumn="directionColumn">
              <ma-grid-row :noGutters="noGutters">
                <ma-grid-column>
                  <div class="content pink">{{ lorem.slice(0, 70) }}</div>
                </ma-grid-column>
              </ma-grid-row>
              <ma-grid-row :noGutters="noGutters">
                <ma-grid-column v-for="i in 2" :key="i" class="ma-grid-col--6">
                  <div class="content">{{ lorem.slice(0, 40) }}</div>
                </ma-grid-column>
              </ma-grid-row>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-2">
              <div class="content">{{ lorem.slice(0, 90) }}</div>
            </ma-grid-column>
            <ma-grid-column class="ma-grid-col--12 ma-grid-col--sm-6 ma-grid-col--md-3">
              <div class="content">{{ lorem.slice(0, 100) }}</div>
            </ma-grid-column>
          </ma-grid-row>
        </ma-grid-container>
      `,

      props: {
        fluid: {
          default: fluid,
        },
        noGutters: {
          default: noGutters,
        },
        directionColumn: {
          default: directionColumn,
        },
      },

      data() {
        return {
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        }
      },
    }
  })

  .add('Form', () => {
    const defaultOptions = [
      { text: 'Option1', value: 'option1' },
      { text: 'Option2', value: 'option2' },
      { text: 'Option3', value: 'option3' },
      { text: 'Option4', value: 'option4' },
    ]
    const options = object('Options', defaultOptions)
    const noMarginBottom = boolean(
      'All col from last row dont have margin bottom',
      true
    )
    const hasMarginTop = boolean(
      'All cols from last row have margin top',
      false
    )

    return {
      components: {
        MaGridContainer,
        MaGridRow,
        MaGridColumn,
        MaText,
        MaSelect,
        MaCard,
      },

      template: `
        <ma-grid-container form>
          <ma-card>
            <ma-grid-row>
              <ma-grid-column class="ma-grid-col--12 ma-grid-col--md-4">
                <ma-text
                  :label="'Mobile col-12, Desktop col-4'"
                />
              </ma-grid-column>
              <ma-grid-column class="ma-grid-col--12 ma-grid-col--md-4">
                <ma-select
                  :label="'Mobile col-12, Desktop col-4'"
                  :options="options"
                />
              </ma-grid-column>
              <ma-grid-column class="ma-grid-col--12 ma-grid-col--md-4">
                <ma-text
                  :label="'Mobile col-12, Desktop col-4'"
                />
              </ma-grid-column>
            </ma-grid-row>
            <ma-grid-row :noMarginBottom="noMarginBottom" :hasMarginTop="hasMarginTop">
              <ma-grid-column class="ma-grid-col--12 ma-grid-col--md-3">
                <ma-text
                  :label="'Mobile col-12, Desktop col-3'"
                />
              </ma-grid-column>
              <ma-grid-column class="ma-grid-col--6 ma-grid-col--md-5">
                <ma-select
                  :label="'Mobile col-6, Desktop col-5'"
                  :options="options"
                />
              </ma-grid-column>
              <ma-grid-column class="ma-grid-col--6 ma-grid-col--md-4">
                <ma-text
                  :label="'Mobile col-6, Desktop col-4'"
                />
              </ma-grid-column>
            </ma-grid-row>
          </ma-card>
        </ma-grid-container>
      `,

      props: {
        hasMarginTop: {
          default: hasMarginTop,
        },
        noMarginBottom: {
          default: noMarginBottom,
        },
        options: {
          default: options,
        },
      },
    }
  })
