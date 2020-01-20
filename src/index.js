import './scss/_margarita.scss'

import MaAlert from './components/MaAlert'
import MaButton from './components/MaButton'
import MaCard from './components/MaCard'
import MaCheckbox from './components/MaCheckbox'
import MaDatagrid from './components/MaDatagrid'
import MaGridColumn from './components/MaGridColumn'
import MaGridContainer from './components/MaGridContainer'
import MaGridRow from './components/MaGridRow'
import MaIcon from './components/MaIcon'
import MaPagination from './components/MaPagination'
import MaPill from './components/MaPill'
import MaRadio from './components/MaRadio'
import MaRange from './components/MaRange'
import MaSelect from './components/MaSelect'
import MaSidebar from './components/MaSidebar'
import MaText from './components/MaText'
import markdown from './directives/markdown'

export {
  MaAlert,
  MaButton,
  MaCard,
  MaCheckbox,
  MaDatagrid,
  MaGridColumn,
  MaGridContainer,
  MaGridRow,
  MaIcon,
  MaPagination,
  MaPill,
  MaRadio,
  MaRange,
  MaSelect,
  MaSidebar,
  MaText,
}

function install(Vue) {
  Vue.component('ma-alert', MaAlert)
  Vue.component('ma-button', MaButton)
  Vue.component('ma-card', MaCard)
  Vue.component('ma-checkbox', MaCheckbox)
  Vue.component('ma-datagrid', MaDatagrid)
  Vue.component('ma-grid-column', MaGridColumn)
  Vue.component('ma-grid-container', MaGridContainer)
  Vue.component('ma-grid-row', MaGridRow)
  Vue.component('ma-icon', MaIcon)
  Vue.component('ma-pagination', MaPagination)
  Vue.component('ma-pill', MaPill)
  Vue.component('ma-radio', MaRadio)
  Vue.component('ma-range', MaRange)
  Vue.component('ma-select', MaSelect)
  Vue.component('ma-sidebar', MaSidebar)
  Vue.component('ma-text', MaText)
  Vue.directive('markdown', markdown)
}

export default { install }
