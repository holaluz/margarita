import snarkdown from 'snarkdown'

const ATTR_REGEX = /<<(.*)>>/g
const CLASS_REGEX = /^\.[\w-]+$/
const ID_REGEX = /^#[\w-]+$/

const BLANK = 'blank'
const BLANK_ATTRS = [
  { key: 'target', value: '_blank' },
  { key: 'rel', value: 'noopener,nofollow' },
]

// Checks and process matched attributes
function processAttributes(currentNode) {
  const attrMatch = ATTR_REGEX.exec(currentNode.textContent)

  if (attrMatch) {
    // If there are markdown attributes, we add them to the previous HTML node.
    const previousNode = currentNode.previousSibling
    attrMatch[1].split(' ').forEach(attr => addNodeAttr(previousNode, attr))
    // We remove the markdown attributes from the DOM
    currentNode.textContent = currentNode.textContent.replace(ATTR_REGEX, '')
  }
}

// Adds attributes to html node
function addNodeAttr(node, attribute = '') {
  const attr = attribute.trim()
  if (attr.match(CLASS_REGEX)) {
    node.classList.add(attr.replace('.', ''))
  } else if (attr.match(ID_REGEX)) {
    node.id = attr.replace('#', '')
  } else if (attr === BLANK) {
    BLANK_ATTRS.forEach(({ key, value }) => node.setAttribute(key, value))
  }
}

// Adds attributes (class, id and blank target' link)
// to an HTML node if the next text node has markdown attributes.
function setMarkdownAttributes({ childNodes }) {
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes.item(i)
    // If the next HTML node is an HTML tag, we parse its contents.
    if (node.tagName) setMarkdownAttributes(node)
    // If the next HTML node is a text node we check if there are markdown attributes in it.
    else if (i > 0) processAttributes(node)
  }
}

export default (el, { value }) => {
  el.innerHTML = snarkdown(value)
  setMarkdownAttributes(el)
}
