<template>
  <div v-if="totalItems" class="ma-pagination">
    <div v-show="!isStart" class="ma-pagination__left">
      <ma-button
        category="secondary"
        :aria-label="leftButtonAria"
        class="ma-pagination__button ma-pagination__button--backwards"
        @click="onButtonClick(currentPage - 1)"
      >
        <ma-icon icon="Arrow" width="16" height="16" />
      </ma-button>
    </div>

    <template v-for="(page, index) in displayedPages">
      <div :key="index" class="ma-pagination__element">
        <ma-button
          :category="computedPageCategory(page)"
          :aria-label="`${numberButtonAria} ${page}`"
          class="ma-pagination__button ma-pagination__button--number"
          @click="onButtonClick(page)"
          v-text="page"
        />
      </div>
      <div
        v-if="shouldDisplaySeparator(index)"
        :key="`${page}-separator`"
        class="ma-pagination__separator"
      >
        ...
      </div>
    </template>

    <div v-show="!isEnd" class="ma-pagination__right">
      <ma-button
        category="secondary"
        :aria-label="rightButtonAria"
        class="ma-pagination__button ma-pagination__button--forwards"
        @click="onButtonClick(currentPage + 1)"
      >
        <ma-icon icon="Arrow" width="16" height="16" />
      </ma-button>
    </div>
  </div>
</template>

<script>
import MaButton from '@margarita/components/MaButton'
import MaIcon from '@margarita/components/MaIcon'

export default {
  name: 'MaPagination',

  components: {
    MaIcon,
    MaButton,
  },

  props: {
    buttonsNumber: {
      type: Number,
      default: 5,
      validator: (value) => value >= 3,
    },

    totalItems: {
      type: Number,
      required: true,
    },

    itemsPerPage: {
      type: Number,
      required: true,
    },

    leftButtonAria: {
      type: String,
      default: 'Previous page',
    },

    rightButtonAria: {
      type: String,
      default: 'Next page',
    },

    numberButtonAria: {
      type: String,
      default: 'Page number',
    },

    startPage: {
      type: Number,
      default: 1,
      validator: (value) => value >= 1,
    },
  },

  data() {
    return {
      currentPage: this.startPage,
    }
  },

  computed: {
    displayedPages() {
      const result = new Set()

      if (!this.endPage) return []

      result.add(1)
      result.add(this.endPage)

      for (let i = 0; result.size < this.numberOfButtonsToDisplay; ++i) {
        if (this.currentPage - i > 1) result.add(this.currentPage - i)
        if (this.currentPage + i < this.endPage)
          result.add(this.currentPage + i)
      }

      return [...result].sort((a, b) => a - b)
    },

    numberOfButtonsToDisplay() {
      if (this.endPage < this.buttonsNumber) return this.endPage
      return this.buttonsNumber
    },

    endPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },

    isEnd() {
      return this.currentPage === this.endPage
    },

    isStart() {
      return this.currentPage === 1
    },
  },

  created() {
    if (this.endPage < this.currentPage) this.currentPage = this.endPage
  },

  methods: {
    computedPageCategory(page) {
      return this.currentPage === page ? 'primary' : 'secondary'
    },

    shouldDisplaySeparator(index) {
      return this.displayedPages[index + 1] - this.displayedPages[index] > 1
    },

    onButtonClick(page) {
      this.currentPage = page
      this.$emit('pagination', page)
    },
  },
}
</script>

<style lang="scss" src="./MaPagination.scss" scoped></style>
