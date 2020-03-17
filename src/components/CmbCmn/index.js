import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

import gtm from './_plugins/gtm'
import { MaIcon, MaButton, MaText, MaAlert } from '../../index'
import CallMeNow from './CallMeNow.vue'
import CallMeNowTimeout from './extensions/CallMeNowTimeout'
import Store from './_store'

export default function(Vue, el) {
  Vue.use(Vuex)
  Vue.use(VueI18n)
  Vue.use(gtm)

  Vue.component('ma-button', MaButton)
  Vue.component('ma-icon', MaIcon)
  Vue.component('ma-text', MaText)
  Vue.component('ma-alert', MaAlert)

  new Vue({
    el,
    components: { CallMeNow, CallMeNowTimeout },
    i18n: new VueI18n({ locale: 'es' }),
    store: new Vuex.Store(Store),
    mounted() {
      this.$store.dispatch('setIsWorkTime')
    },
  })
}
