import snarkdown from 'snarkdown'

const ATTR_REGEX = /<<(.*)>>/g
const CLASS_REGEX = /^\.[\w-]+$/
const ID_REGEX = /^#[\w-]+$/

export default (el, { value }) => {
  el.innerHTML = snarkdown(value)
  setMarkdownAttributes(el)
}

// Adds attributes (class or id) to an HTML node if the next text node has markdown attributes.
function setMarkdownAttributes({ childNodes }) {
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i]
    // If the next HTML node is an HTML tag, we parse its contents.
    if (node.tagName) setMarkdownAttributes(node)
    // If the next HTML node is a text node we check if there are markdown attributes in it.
    else if (i > 0) {
      const attrMatch = ATTR_REGEX.exec(node.textContent)
      if (attrMatch) {
        // If there are markdown attributes, we add them to the previous HTML node.
        attrMatch[1]
          .split(' ')
          .forEach(attr => addNodeAttr(childNodes[i - 1], attr))
        // We remove the markdown attributes from the DOM
        node.textContent = node.textContent.replace(ATTR_REGEX, '')
      }
    }
  }
}

// Adds class or id to an HTML node
function addNodeAttr(node, attribute = '') {
  const attr = attribute.trim()
  if (attr.match(CLASS_REGEX)) {
    node.classList.add(attr.replace('.', ''))
  } else if (attr.match(ID_REGEX)) {
    node.id = attr.replace('#', '')
  }
}
