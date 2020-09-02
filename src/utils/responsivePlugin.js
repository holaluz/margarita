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
      currentBreakpoint: null,
    })
    vue.prototype.$layout.getResponsivePropValue = function (responsiveProp) {
      const normalizedResponsiveProp = normalizeResponsiveProp(responsiveProp)
      const index = Object.values(breakpointsEnum).indexOf(
        vue.prototype.$layout.currentBreakpoint
      )

      return normalizedResponsiveProp[index]
    }

    if (process.server) return

    setCurrentBreakpoint()
    window.addEventListener(
      'resize',
      throttle(setCurrentBreakpoint, throttleMs)
    )

    function setCurrentBreakpoint() {
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

/**
 * Normalizes `value` to a same-length array to easily grab the right responsive prop.
 */
function normalizeResponsiveProp(value) {
  const valueToArray = Array.isArray(value) ? value : [value]

  return Array(3)
    .fill('')
    .map((_, i) => valueToArray[i] || valueToArray[valueToArray.length - 1])
}
