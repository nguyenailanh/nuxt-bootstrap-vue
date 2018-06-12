<template>
  <div>
    <ul class="pagination">
      <li
        class="page-item"
      >
        <i
          class="page-link ion-ios-skipbackward"
          @click.prevent="onClickFirstPage"
          :disabled="isInFirstPage"
          :class="{disabled: isInFirstPage}"
          aria-label="Go to first page"
        >
        </i>
      </li>
      <li
        class="page-item"
      >
        <i
          class="page-link ion-arrow-left-b"
          @click.prevent="onClickPreviousPage"
          :disabled="isInFirstPage"
          :class="{disabled: isInFirstPage}"
          aria-label="Go to first page"
        >
        </i>
      </li>
      <li
        v-for="(page, index) in pages"
        :key="index"
        class="page-item"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.index) }"
      >
        <button
          class="page-link"
          @click.prevent="onClickPage(page.index)"
        >
          {{page.index}}
        </button>
      </li>
      <li
        class="page-item"
      >
        <i
          class="page-link ion-arrow-right-b"
          @click.prevent="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          :class="{disabled: isInLastPage}"
        >
        </i>
      </li>
      <li
        class="page-item"
      >
        <i
          class="page-link ion-ios-skipforward"
          @click.prevent="onClickLastPage"
          :disabled="isInLastPage"
          :class="{disabled: isInLastPage}"
          aria-label="Go to last page"
        >
        </i>
      </li>
    </ul>

  </div>
</template>

<script>
import { defaultParam } from '@/utils/api';
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  name: 'PaginationNew',
   props: {
    currentPage: {
      type: Number,
      required: true
    },
    maxVisibleButtons : {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState('articles', ['activePage', 'articlesCount']),
    totalPages() {
      return [...Array(Math.ceil(this.articlesCount / defaultParam.limit)).keys()].length
    },

    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return Math.max(this.totalPages - this.maxVisibleButtons + 1, 1);
      }

      return Math.max(this.currentPage - 1, 1);
    },

    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          index: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },

    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {

    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};

</script>

<style lang="scss" scoped>
  .page-link {
    cursor: pointer;
    user-select: none;
    outline: none;
    &.disabled {
      pointer-events: none;
      background: #ccc;
      color: darkgray;
    }
  }
</style>


