<script>
export default {
  name: 'MaTabs',

  provide() {
    return {
      variant: this.variant,
    }
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },

    variant: {
      type: String,
      default: 'underline',
      validator: (v) => ['underline', 'gradient'].includes(v),
    },
  },

  data() {
    return {
      selectedIndex: this.value,
    }
  },

  methods: {
    setSelectedIndex(e, index) {
      this.selectedIndex = index
      this.$emit('input', index)
    },
  },

  render() {
    const tabs = this.$slots.default.filter((c) => c.tag)

    const tabList = []
    tabs.forEach((child, index) => {
      const { title, icon, pill } = child.componentOptions.propsData

      const isSelectedTab = this.selectedIndex === index

      const tabHeaderContent =
        this.variant === 'underline' ? (
          <ma-layout gap="small" columns="*" verticalAlign="center">
            {icon && <ma-icon icon={icon} />}
            <ma-text bold>{title}</ma-text>
            {pill && <ma-pill text={pill} />}
          </ma-layout>
        ) : (
          <ma-layout gap="small" columns="12 - 12">
            <ma-text bold>{title}</ma-text>
            <div>{child.data.scopedSlots?.header()}</div>
          </ma-layout>
        )

      tabList.push(
        <li
          class={`tabs-header-item ${
            isSelectedTab ? 'tabs-header-item--active' : ''
          }`}
          role="tab"
          onClick={(e) => this.setSelectedIndex(e, index)}
          aria-selected={isSelectedTab ? 'true' : 'false'}
        >
          {tabHeaderContent}
        </li>
      )
    })

    return (
      <div class={`tabs tabs--${this.variant}`} role="tabs">
        <ma-layout
          columns="*"
          gap="small"
          tag="ul"
          class="tabs-header"
          role="tablist"
        >
          {tabList}
        </ma-layout>
        {tabs[this.selectedIndex]}
      </div>
    )
  },
}
</script>

<style lang="postcss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tabs-header-item--active {
  border: 1px solid red;
}
</style>
