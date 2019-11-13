import snarkdown from 'snarkdown'

const REGEX_PATTERN = /<<(.*)>>/g
const CLASS_PATTERN = /^\.[\w-]+$/
const ID_PATTERN = /^#[\w-]+$/

export default (el, { value }) => {
  el.innerHTML = snarkdown(value)

  setClassNames(el)
}

function setClassNames(el) {
  const nodes = el.childNodes

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.tagName) {
      setClassNames(node)
    } else if (i > 0) {
      const attrs = node.textContent
      const match = REGEX_PATTERN.exec(attrs)

      if (match) {
        const attrList = match[1].split(' ')
        const prevNode = nodes[i - 1]

        attrList.forEach((attr = '') => {
          attr = attr.trim()
          if (attr.match(CLASS_PATTERN)) {
            prevNode.classList.add(attr.replace('.', ''))
          } else if (attr.match(ID_PATTERN)) {
            prevNode.id = attr.replace('#', '')
          }
        })

        node.textContent = node.textContent.replace(REGEX_PATTERN, '')
      }
    }
  }
}
