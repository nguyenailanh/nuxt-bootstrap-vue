<template>
  <div>
    <ul class="pagination">
      <li
        v-for="index in pages"
        :key="index"
        class="page-item"
        :class="{ active: (index === activePage) }"
      >
        <a
          class="page-link"
          href=""
          @click.prevent="paginationChange"
        >
          {{index + 1}}
        </a>
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
  name: 'Pagination',
  computed: {
    ...mapState('articles', ['activePage', 'articlesCount']),
    pages() {
      return [...Array(Math.ceil(this.articlesCount / defaultParam.limit)).keys()]
    }
  },
  methods: {
    ...mapActions('articles', ['setActivePage']),
    paginationChange(evt) {
      this.setActivePage(+evt.currentTarget.innerText - 1);
    },
  },
};

</script>

