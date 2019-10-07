import Vue from 'vue'
import markdownIt from 'markdown-it'
import attrs from 'markdown-it-attrs'

const md = new markdownIt().use(attrs, {
  leftDelimiter: '<<',
  rightDelimiter: '>>',
})

Vue.directive('markdown', (el, { value }) => {
  el.innerHTML = md.render(value)
})
