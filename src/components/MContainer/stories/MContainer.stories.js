import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/vue'

const tags = [
  'div',
  'header',
  'aside',
  'article',
  'section'
]

const gutterSizes = {
  'none': 'none',
  'grid-list-xs': 'xs',
  'grid-list-sm': 'sm',
  'grid-list-md': 'md',
  'grid-list-lg': 'lg',
  'grid-list-xl': 'xl'
}

const defaults = {
  gutterSize: 'grid-list-md',
  tag: 'div'
}

storiesOf('Grid System', module)
  .addDecorator(withKnobs)
  .add('Usage', () => {
    const fluid = boolean('Fluid Layout', false)
    const containerTag = select('Container Tag', tags, defaults.tag)
    const gutterSize = select('Gutter Size', gutterSizes, defaults.gutterSize)
    const layoutTag = select('Layout Tag', tags, defaults.tag)

    return ({
      template: `
        <v-app>
          <v-container :fluid="fluid" :tag="containerTag" :class="gutterSize" text-xs-center>
            <v-layout :tag="layoutTag" row wrap>
              <v-flex xs12>
                <v-card dark color="primary">
                  <v-card-text class="px-0">12</v-card-text>
                </v-card>
              </v-flex>
              <v-flex v-for="i in 2" :key="1 + i" xs6>
                <v-card dark color="secondary">
                  <v-card-text class="px-0">6</v-card-text>
                </v-card>
              </v-flex>
              <v-flex v-for="i in 3" :key="10 + i" xs4>
                <v-card dark color="primary">
                  <v-card-text class="px-0">4</v-card-text>
                </v-card>
              </v-flex>
              <v-flex v-for="i in 4" :key="20 + i" xs3>
                <v-card dark color="secondary">
                  <v-card-text class="px-0">3</v-card-text>
                </v-card>
              </v-flex>
              <v-flex v-for="i in 6" :key="30 + i" xs2>
                <v-card dark color="primary">
                  <v-card-text class="px-0">2</v-card-text>
                </v-card>
              </v-flex>
              <v-flex v-for="i in 12" :key="40 + i" xs1>
                <v-card dark color="secondary">
                  <v-card-text class="px-0">1</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-app>
      `,

      data () {
        return {
          fluid: fluid,
          containerTag: containerTag,
          gutterSize: gutterSize,
          layoutTag: layoutTag
        }
      }
    })
  })
