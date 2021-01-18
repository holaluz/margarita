import './css/tokens.css'
import './scss/_margarita.scss'

import MaAlert from './components/MaAlert'
import MaButton from './components/MaButton'
import MaCard from './components/MaCard'
import MaDatagrid from './components/MaDatagrid'
import MaHidden from './components/MaHidden'
import MaIcon from './components/MaIcon'
import MaModal from './components/MaModal'
import MaOption from './components/MaOption'
import MaPagination from './components/MaPagination'
import MaPill from './components/MaPill'
import MaRange from './components/MaRange'
import MaSelect from './components/MaSelect'
import MaSidebar from './components/MaSidebar'
import MaTextField from './components/MaTextField'
import MaStack from './components/MaStack'
import { markdown, markdownSSR } from './directives/markdown'
import responsivePlugin from './plugins/responsivePlugin'

export {
  MaAlert,
  MaButton,
  MaCard,
  MaDatagrid,
  MaHidden,
  MaIcon,
  MaModal,
  MaOption,
  MaPagination,
  MaPill,
  MaRange,
  MaSelect,
  MaSidebar,
  MaStack,
  MaTextField,
  markdown,
  markdownSSR,
  responsivePlugin,
}

function install(Vue) {
  Vue.use(responsivePlugin)

  Vue.component('MaAlert', MaAlert)
  Vue.component('MaButton', MaButton)
  Vue.component('MaCard', MaCard)
  Vue.component('MaDatagrid', MaDatagrid)
  Vue.component('MaHidden', MaHidden)
  Vue.component('MaIcon', MaIcon)
  Vue.component('MaModal', MaModal)
  Vue.component('MaOption', MaOption)
  Vue.component('MaPagination', MaPagination)
  Vue.component('MaPill', MaPill)
  Vue.component('MaRange', MaRange)
  Vue.component('MaSelect', MaSelect)
  Vue.component('MaSidebar', MaSidebar)
  Vue.component('MaStack', MaStack)
  Vue.component('MaTextField', MaTextField)

  Vue.directive('markdown', markdown)
}

export default { install }
