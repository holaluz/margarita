import Vue from 'vue'

export default Vue.extend({
  // as an abstract component, it doesn't appear in $parent chain of components
  // which means the next parent of any component rendered inside of this
  // will be the parent from which it was portal'd
  abstract: true,

  name: 'MaModalTargetContainer',

  props: {
    nodes: { type: Function, default: () => {} },
    tag: { type: String, required: true },
  },

  data: (vm) => ({
    updatedNodes: vm.nodes,
  }),

  destroyed() {
    const { $el: el } = this
    el.parentNode.removeChild(el)
  },

  render(h) {
    const nodes = this.updatedNodes && this.updatedNodes()

    if (!nodes) return h()

    return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes)
  },
})
