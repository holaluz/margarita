import markdownIt from 'markdown-it'
import attrs from 'markdown-it-attrs'

const md = new markdownIt().use(attrs, {
  leftDelimiter: '<<',
  rightDelimiter: '>>',
})

export default (el, { value }) => {
  el.innerHTML = md.render(value)
}
