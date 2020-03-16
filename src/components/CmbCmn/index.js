import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

import { MaIcon, MaButton, MaText } from '../../index'
import CallMeNow from './CallMeNow.vue'
import CallMeNowTimeout from './extensions/CallMeNowTimeout'
import Store from './_store'

export default function(Vue, el) {
  Vue.use(Vuex)
  Vue.use(VueI18n)

  Vue.component('ma-button', MaButton)
  Vue.component('ma-icon', MaIcon)
  Vue.component('ma-text', MaText)

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
