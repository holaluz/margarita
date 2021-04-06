import './css/index.css'

import MaAlert from './components/MaAlert'
import MaButton from './components/MaButton'
import MaCard from './components/MaCard'
import MaContainer from './components/MaContainer'
import MaDatagrid from './components/MaDatagrid'
import MaHidden from './components/MaHidden'
import MaIcon from './components/MaIcon'
import MaLayout from './components/MaLayout'
import MaModal from './components/MaModal'
import MaOption from './components/MaOption'
import MaPagination from './components/MaPagination'
import MaPill from './components/MaPill'
import MaRange from './components/MaRange'
import MaSelect from './components/MaSelect'
import MaText from './components/MaText'
import MaTextField from './components/MaTextField'
import MaList from './components/MaList'
import MaStack from './components/MaStack'
import MaHeading from './components/MaHeading'
import { markdown, markdownSSR } from './directives/markdown'
import responsivePlugin from './plugins/responsivePlugin'

export {
  MaAlert,
  MaButton,
  MaCard,
  MaContainer,
  MaDatagrid,
  MaHidden,
  MaIcon,
  MaLayout,
  MaModal,
  MaOption,
  MaPagination,
  MaPill,
  MaRange,
  MaSelect,
  MaStack,
  MaText,
  MaTextField,
  MaList,
  MaHeading,
  markdown,
  markdownSSR,
  responsivePlugin,
}

function install(Vue) {
  Vue.use(responsivePlugin)

  Vue.component('MaAlert', MaAlert)
  Vue.component('MaButton', MaButton)
  Vue.component('MaCard', MaCard)
  Vue.component('MaContainer', MaContainer)
  Vue.component('MaDatagrid', MaDatagrid)
  Vue.component('MaHidden', MaHidden)
  Vue.component('MaIcon', MaIcon)
  Vue.component('MaLayout', MaLayout)
  Vue.component('MaModal', MaModal)
  Vue.component('MaOption', MaOption)
  Vue.component('MaPagination', MaPagination)
  Vue.component('MaPill', MaPill)
  Vue.component('MaRange', MaRange)
  Vue.component('MaSelect', MaSelect)
  Vue.component('MaStack', MaStack)
  Vue.component('MaHeading', MaHeading)
  Vue.component('MaText', MaText)
  Vue.component('MaTextField', MaTextField)
  Vue.component('MaList', MaList)

  Vue.directive('markdown', markdown)
}

export default { install }
