export default function(vue) {
  vue.prototype.$gtm = {
    pushEvent(e) {
      if (!window.dataLayer || !window.dataLayer.push) return
      window.dataLayer.push(e)
    },
  }
}
