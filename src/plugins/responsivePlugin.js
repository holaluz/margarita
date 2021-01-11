import { breakpoints, breakpointsEnum } from '../tokens'

export default {
  install(vue) {
    vue.prototype.$layout = vue.observable({ currentBreakpoint: null })
    vue.prototype.$layout.getResponsivePropValue = getResponsivePropValue

    // If we're on the server, let's set breakpoint to desktop and call it a day
    if (typeof window === 'undefined') {
      vue.prototype.$layout.currentBreakpoint = breakpointsEnum.desktop
      return
    }

    const tabletQuery = minWidthQuery(breakpoints.tablet)
    const desktopQuery = minWidthQuery(breakpoints.desktop)

    addListenerToMediaQueryList(tabletQuery, updateCurrentBreakpoint)
    addListenerToMediaQueryList(desktopQuery, updateCurrentBreakpoint)

    updateCurrentBreakpoint()

    function updateCurrentBreakpoint() {
      const newBreakpoint = getCurrentBreakpoint(tabletQuery, desktopQuery)

      vue.prototype.$layout.currentBreakpoint = newBreakpoint
    }

    function getResponsivePropValue(responsiveProp) {
      const normalizedResponsiveProp = normalizeResponsiveProp(responsiveProp)
      const { currentBreakpoint } = vue.prototype.$layout
      const index = Object.values(breakpointsEnum).indexOf(currentBreakpoint)

      return normalizedResponsiveProp[index]
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

function minWidthQuery(breakpoint) {
  return window.matchMedia(`(min-width: ${breakpoint}px)`)
}

function getCurrentBreakpoint(tabletQuery, desktopQuery) {
  if (desktopQuery.matches) {
    return breakpointsEnum.desktop
  }

  if (tabletQuery.matches) {
    return breakpointsEnum.tablet
  }

  return breakpointsEnum.mobile
}

function addListenerToMediaQueryList(mediaQueryList, listenerCallback) {
  /**
   * Even though docs mention that all browsers support `addEventListener`
   * (source: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Methods)
   * turns out Safari does not.
   * It only implements the deprecated `addListener` method, and throws
   * when trying calling on the former.
   *
   * Thus, we attempt to register the callback using `addEventListener`, but
   * in case of failure we fall back to the deprecated `addListener`.
   *
   * Related:
   *   https://github.com/mdn/sprints/issues/858
   *   https://stackoverflow.com/a/60000747/1042082
   */
  try {
    mediaQueryList.addEventListener('change', listenerCallback)
  } catch {
    mediaQueryList.addListener(listenerCallback)
  }
}
