import DemoBlock from './DemoBlock'

export default {
  title: 'Layout/Layout/examples',
}

const LayoutTemplate = ({
  childCount,
  columns,
  title,
  justify = 'start',
}) => () => ({
  components: { DemoBlock },
  template: `
  <div>
  <h3>${title} (columns='${columns}')</h3>
  <div style='background-color: rgb(241, 241, 241); width: 400px;margin-bottom:2rem'>
    <ma-layout gap="small" columns="${columns}" justify="${justify}">
        <demo-block v-for="i in ${childCount}" :key="i">{{ i }}</demo-block>
    </ma-layout>
  </div>
  <div>
  `,
})

export const Example1 = LayoutTemplate({
  title: 'Full width rows',
  columns: '12',
  childCount: 3,
})

export const Example2 = LayoutTemplate({
  title: 'Simple column layout',
  columns: '2 4 6',
  childCount: 3,
})

export const Example3 = LayoutTemplate({
  title: 'Simple grid',
  columns: '4 4 4',
  childCount: 6,
})

export const Example4 = LayoutTemplate({
  title: 'A complex grid',
  columns: '3 4 5 - 5 4 3 - 12',
  childCount: 7,
})

export const Example5 = LayoutTemplate({
  title: 'An indeterminate number of columns',
  columns: '3 4 5 - *',
  childCount: 8,
})

export const Example6 = LayoutTemplate({
  title: 'The 12 column layout',
  columns: '1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 - 11 - 12',
  childCount: 12,
})

export const Example7 = LayoutTemplate({
  title: 'Justify center',
  columns: '3 4 5 - 5 - 5 4 3',
  justify: 'center',
  childCount: 7,
})

export const Example8 = LayoutTemplate({
  title: 'Justify end',
  columns: '3 4 5 - 5 - 5 4 3',
  justify: 'end',
  childCount: 7,
})

export const Example9 = LayoutTemplate({
  title: 'Justify space between',
  columns: '3 4 5 - 5 5 - 5 4 3',
  justify: 'space-between',
  childCount: 8,
})

export const Example10 = LayoutTemplate({
  title: 'Justify space around',
  columns: '3 4 5 - 5 5 - 5 4 3',
  justify: 'space-around',
  childCount: 8,
})

export const Example11 = () => ({
  components: { DemoBlock },
  template: `
  <div>
  <h3>Nested MaLayout:</h3>
  <div style='background-color: rgb(241, 241, 241); width: 400px;margin-bottom:2rem'>
    <ma-layout gap="small" columns="3 4 5">
        <demo-block v-for="i in 5" :key="i">{{ i }}</demo-block>
        <ma-layout gap="small" columns="12">
          <demo-block>a</demo-block>
          <demo-block>b</demo-block>
        </ma-layout>
    </ma-layout>
  </div>
  <div>
  `,
})
