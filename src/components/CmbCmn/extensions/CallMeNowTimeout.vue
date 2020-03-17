<script>
import CallMeNow from '../CallMeNow'
import { isMobile } from '../_utils/is-mobile'

const OPEN_TIMEOUT_MS = 2 * 1000
const MIN_Y_SCROLL = 70

export default {
  extends: CallMeNow,

  destroyed() {
    this.removeScrollListener()
  },

  mounted() {
    if (isMobile()) {
      window.addEventListener('scroll', this.handleScroll)
    } else {
      setTimeout(() => {
        if (!this.hasUserInteracted) {
          this.$gtm.pushEvent({
            event: 'GtmAbrirSegundos',
          })
          this.toggleIsOpen()
        }
      }, OPEN_TIMEOUT_MS)
    }
  },

  methods: {
    handleScroll() {
      if (window.pageYOffset < MIN_Y_SCROLL) return
      if (!this.hasUserInteracted) {
        this.$gtm.pushEvent({
          event: 'GtmAbrirScroll',
        })
        this.toggleIsOpen()
      }
      this.removeScrollListener()
    },

    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll)
    },
  },
}
</script>
