import './stories.scss'
import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs'

import GridNestedNotes from './GridNested.md'
import GridOffsetNotes from './GridOffset.md'
import GridOrderNotes from './GridOrder.md'
import GridSystemNotes from './GridSystem.md'
import GridFormNotes from './GridForm.md'

import GridContainer from '@margarita/components/GridContainer'
import GridRow from '@margarita/components/GridRow'
import GridColumn from '@margarita/components/GridColumn'
import TextInput from '@margarita/components/TextInput'
import SelectInput from '@margarita/components/SelectInput'
import LayoutCard from '@margarita/components/LayoutCard'

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .add(
    'Grid',
    () => {
      const fluid = boolean('Fluid layout', false)
      const tag = select(
        'Tag',
        ['div', 'header', 'aside', 'article', 'section'],
        'div'
      )
      const noGutters = boolean('No gutters', false)

      return {
        components: { GridContainer, GridRow, GridColumn },

        template: `
        <grid-container :fluid="fluid" :tag="tag" class="grid-example">
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 1" :key="col" class="grid-col--12">
              <div class="content px0">12</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 2" :key="col" class="grid-col--6">
              <div class="content px0">6</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 3" :key="col" class="grid-col--4">
              <div class="content px0">4</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 4" :key="col" class="grid-col--3">
              <div class="content px0">3</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 6" :key="col" class="grid-col--2">
              <div class="content px0">2</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column v-for="col in 12" :key="col" class="grid-col--1">
              <div class="content px0">1</div>
            </grid-column>
          </grid-row>
        </grid-container>
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
    },
    { notes: GridSystemNotes }
  )
  .add(
    'Offset',
    () => {
      const fluid = boolean('fluid', false)
      const noGutters = boolean('noGutters', false)

      return {
        components: { GridContainer, GridRow, GridColumn },

        template: `
        <grid-container :fluid="fluid" class="grid-example">
          <grid-row :noGutters="noGutters">
            <grid-column class="grid-col--10 grid-col--offset-2">
              <div class="content">grid-col--10 grid-col--offset-2</div>
            </grid-column>
            <grid-column class="grid-col--4 grid-col--offset-5 grid-col--md-offset-3">
              <div class="content">grid-col--4 grid-col--(offset-5 | md-offset-3)</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--md-4 grid-col--md-offset-1">
              <div class="content">grid-col--12 grid-col--md-4 grid-col--md-offset-1</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-7 grid-col--sm-offset-1">
              <div class="content">grid-col--12 grid-col--(sm-6 | md-7) grid-col--sm-offset-1</div>
            </grid-column>
          </grid-row>
        </grid-container>
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
    },
    { notes: GridOffsetNotes }
  )
  .add(
    'Order',
    () => {
      const fluid = boolean('fluid', false)
      const noGutters = boolean('noGutters', false)

      return {
        components: { GridContainer, GridRow, GridColumn },

        template: `
        <grid-container :fluid="fluid" class="grid-example">
          <grid-row :noGutters="noGutters">
            <grid-column class="grid-col--6 grid-col--lg-order-2">
              <div class="content">#1</div>
            </grid-column>
            <grid-column class="grid-col--6">
              <div class="content">#2</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column class="grid-col--4 grid-col--md-order-2 grid-col--order-1">
              <div class="content">#1</div>
            </grid-column>
            <grid-column class="grid-col--4 grid-col--md-order-3 grid-col--order-2">
              <div class="content">#2</div>
            </grid-column>
            <grid-column class="grid-col--4 grid-col--md-order-1 grid-col--order-3">
              <div class="content">#3</div>
            </grid-column>
          </grid-row>
          <grid-row :noGutters="noGutters">
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3 grid-col--md-order-4 grid-col--sm-order-2">
              <div class="content">#1</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3 grid-col--md-order-3 grid-col--sm-order-1">
              <div class="content">#2</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3 grid-col--md-order-2 grid-col--sm-order-4">
              <div class="content">#3</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3 grid-col--md-order-1 grid-col--sm-order-3">
              <div class="content">#4</div>
            </grid-column>
          </grid-row>
        </grid-container>
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
    },
    { notes: GridOrderNotes }
  )
  .add(
    'Nested',
    () => {
      const fluid = boolean('fluid', false)
      const noGutters = boolean('noGutters', false)
      const directionColumn = boolean(
        'Light blue row has flex direction column',
        true
      )

      return {
        components: { GridContainer, GridRow, GridColumn },

        template: `
        <grid-container :fluid="fluid" class="grid-example">
          <grid-row :noGutters="noGutters">
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-4">
              <div class="content">{{ lorem }}</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3" :directionColumn="directionColumn">
              <grid-row :noGutters="noGutters">
                <grid-column>
                  <div class="content pink">{{ lorem.slice(0, 70) }}</div>
                </grid-column>
              </grid-row>
              <grid-row :noGutters="noGutters">
                <grid-column v-for="i in 2" :key="i" class="grid-col--6">
                  <div class="content">{{ lorem.slice(0, 40) }}</div>
                </grid-column>
              </grid-row>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-2">
              <div class="content">{{ lorem.slice(0, 90) }}</div>
            </grid-column>
            <grid-column class="grid-col--12 grid-col--sm-6 grid-col--md-3">
              <div class="content">{{ lorem.slice(0, 100) }}</div>
            </grid-column>
          </grid-row>
        </grid-container>
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
    },
    { notes: GridNestedNotes }
  )

  .add(
    'Form',
    () => {
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
          GridContainer,
          GridRow,
          GridColumn,
          TextInput,
          SelectInput,
          LayoutCard,
        },

        template: `
        <grid-container form>
          <layout-card>
            <grid-row>
              <grid-column class="grid-col--12 grid-col--md-4">
                <text-input
                  :label="'Mobile col-12, Desktop col-4'"
                />
              </grid-column>
              <grid-column class="grid-col--12 grid-col--md-4">
                <select-input
                  :label="'Mobile col-12, Desktop col-4'"
                  :options="options"
                />
              </grid-column>
              <grid-column class="grid-col--12 grid-col--md-4">
                <text-input
                  :label="'Mobile col-12, Desktop col-4'"
                />
              </grid-column>
            </grid-row>
            <grid-row :noMarginBottom="noMarginBottom" :hasMarginTop="hasMarginTop">
              <grid-column class="grid-col--12 grid-col--md-3">
                <text-input
                  :label="'Mobile col-12, Desktop col-3'"
                />
              </grid-column>
              <grid-column class="grid-col--6 grid-col--md-5">
                <select-input
                  :label="'Mobile col-6, Desktop col-5'"
                  :options="options"
                />
              </grid-column>
              <grid-column class="grid-col--6 grid-col--md-4">
                <text-input
                  :label="'Mobile col-6, Desktop col-4'"
                />
              </grid-column>
            </grid-row>
          </layout-card>
        </grid-container>
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
    },
    { notes: GridFormNotes }
  )
