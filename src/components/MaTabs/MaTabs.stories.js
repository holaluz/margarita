import MaTabs from '.'
import MaTab from '../MaTab'

export default {
  title: 'Components/Tabs',
  component: MaTabs,
  args: {
    label: 'Label',
    id: 'text-input',
  },
  argTypes: {
    'v-model': { control: false },
    input: { action: 'input' },
  },
}

const ContentTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MaTab },
  template: `
    <ma-stack space="large">
      <ma-text>Selected tab: {{selectedTab}}</ma-text>

      <ma-tabs v-bind="$props" v-model="selectedTab" @input="input">
        <ma-tab icon="Gas" title="title 1" pill="15">
          <ma-text>Hello from tab number 1!</ma-text>
        </ma-tab>
        <ma-tab icon="BulbOn" title="title 2" pill="16">
          <ma-text>Hello from tab number 2!</ma-text>
        </ma-tab>
      </ma-tabs>
    </ma-stack>
  `,
  data() {
    return { selectedTab: 0 }
  },
})

export const ContentTabs = ContentTemplate.bind({})

const GradientTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MaTab },
  template: `
    <ma-stack space="large">
      <ma-text>Selected tab: {{selectedTab}}</ma-text>

      <ma-tabs v-bind="$props" v-model="selectedTab" @input="input" variant="gradient">
        <ma-tab title="title 1">
          <template #header>With a custom header</template>
          <ma-text>Hello from tab number 1!</ma-text>
        </ma-tab>
        <ma-tab title="title 2">
          <template #header>With a custom header</template>
          <ma-text>Hello from tab number 2!</ma-text>
        </ma-tab>
        <ma-tab title="title 3">
          <template #header>With a custom header</template>
          <ma-text>Hello from tab number 3!</ma-text>
        </ma-tab>
      </ma-tabs>
    </ma-stack>
  `,
  data() {
    return { selectedTab: 0 }
  },
})

export const GradientTabs = GradientTemplate.bind({})
