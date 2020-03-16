<script>
import debounce from 'lodash/debounce'
import CallMeNow from '../CallMeNow'

const MIN_Y_SCROLL = 500

export default {
  extends: CallMeNow,

  watch: {
    hasUserInteracted() {
      window.removeEventListener('scroll', this.handleScroll)
      this.unwatchOpenWithScroll()
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)

    // https://vuejs.org/v2/api/#vm-watch
    this.unwatchOpenWithScroll = this.$watch('isOpen', isOpen => {
      if (isOpen) {
        // this.$gtm.pushEvent({
        //   event: 'GtmAbrirScroll',
        // })
        this.unwatchOpenWithScroll()
      }
    })
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll: debounce(function() {
      this.isOpen = window.pageYOffset >= MIN_Y_SCROLL
    }, 50),
  },
}
</script>
