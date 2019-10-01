<style lang="scss" src="./MaPagination.scss" scoped></style>

<template>
  <div class="ma-pagination">
    <div
      class="ma-pagination__left"
      :class="{ 'ma-pagination--hidden': isStart }"
    >
      <ma-button
        category="secondary"
        aria-label="Go back icon"
        class="ma-pagination__icon ma-pagination__icon--backwards"
        @click="pagination(currentPage - 1)"
      >
        <ma-icon icon="Arrow" width="16" height="16" />
      </ma-button>
    </div>
    <div class="ma-pagination__current">
      <template v-for="(page, index) in displayedPages">
        <ma-button
          :key="page"
          :category="isActive(page)"
          :aria-label="`Go to page ${page}`"
          class="ma-pagination__icon ma-pagination__icon--number"
          @click="pagination(page)"
          v-text="page"
        />
        <span
          v-if="displaySeparator(index)"
          :key="`${page}-separator`"
          class="ma-pagination__separator"
        >
          ...
        </span>
      </template>
    </div>
    <div
      class="ma-pagination__right"
      :class="{ 'ma-pagination--hidden': isEnd }"
    >
      <ma-button
        category="secondary"
        aria-label="Go forward icon"
        class="ma-pagination__icon ma-pagination__icon--forward"
        @click="pagination(currentPage + 1)"
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
    totalItems: {
      type: Number,
      default: 0,
    },

    itemsPerPage: {
      type: Number,
      default: 10,
    },

    startPage: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      currentPage: this.startPage,
    }
  },

  computed: {
    endPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },

    isEnd() {
      return this.currentPage === this.endPage
    },

    isStart() {
      return this.currentPage === 1
    },

    from() {
      return this.currentPage * this.itemsPerPage - (this.itemsPerPage - 1)
    },

    to() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalItems)
    },

    displayedPages() {
      let pages = [1]

      if (this.isEnd) {
        pages.push(this.currentPage - 2)
      }

      if (this.currentPage > 2) {
        pages.push(this.currentPage - 1)
      }

      if (!this.isStart) {
        pages.push(this.currentPage)
      }

      if (!this.isEnd) {
        pages.push(this.currentPage + 1)
      }

      if (this.isStart) {
        pages.push(this.currentPage + 2)
      }

      if (!this.isEnd && this.currentPage + 1 !== this.endPage) {
        pages.push(this.endPage)
      }

      return pages
    },
  },

  methods: {
    isActive(page) {
      return this.currentPage === page ? 'primary' : 'secondary'
    },

    displaySeparator(index) {
      if (this.displayedPages[index + 1] - this.displayedPages[index] > 1)
        return true

      return false
    },

    pagination(page) {
      this.currentPage = page
      this.$emit('pagination', page)
    },
  },
}
</script>
