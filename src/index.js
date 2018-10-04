import GridColumn from './components/Grid/GridColumn/GridColumn.vue'
import GridContainer from './components/Grid/GridContainer/GridContainer.vue'
import GridRow from './components/Grid/GridRow/GridRow.vue'
import SelectInput from './components/Form/SelectInput/SelectInput.vue'
import TextInput from './components/Form/TextInput/TextInput.vue'

export {
  GridColumn,
  GridContainer,
  GridRow,
  SelectInput,
  TextInput
}

export default {
  install (Vue) {
    Vue.component('GridColumn', GridColumn)
    Vue.component('GridContainer', GridContainer)
    Vue.component('GridRow', GridRow)
    Vue.component('SelectInput', SelectInput)
    Vue.component('TextInput', TextInput)
  }
}
