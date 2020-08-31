import Vue from 'vue'
import throttle from 'lodash/throttle'

const breakpoints = {
  mobile: 300,
  tablet: 700,
  desktop: 900,
}

export const breakpointsEnum = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
}

const throttleMs = 200

export default {
  install(vue) {
    vue.prototype.$layout = Vue.observable({
      currentBreakpoint: breakpointsEnum.mobile,
    })

    if (process.server) return

    checkBreakpoint()
    window.addEventListener('resize', throttle(checkBreakpoint, throttleMs))

    function checkBreakpoint() {
      let newBreakpoint = breakpointsEnum.desktop

      if (window.innerWidth < breakpoints.mobile) {
        newBreakpoint = breakpointsEnum.mobile
      } else if (window.innerWidth < breakpoints.tablet) {
        newBreakpoint = breakpointsEnum.tablet
      }

      vue.prototype.$layout.currentBreakpoint = newBreakpoint
    }
  },
}
