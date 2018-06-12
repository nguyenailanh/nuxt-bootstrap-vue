<template>
  <div class="col-md-9">
    <div class="feed-wrapper row">
      <div class="feed-toggle col-md-6 col-sm-12">
        <ul
          class="nav nav-pills outline-active"
          v-if="isInHome"
        >
          <li class="nav-item">
            <a
              class="nav-link"
              ref="owner"
              href="owner"
              :class="{disabled: !isLogged}"
              @click.prevent="loadArticles"
              data-send='{"isFeed": "true"}'
            >
              Your Feed
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href=""
              ref="global"
              @click.prevent="loadArticles"
              data-send="{}"
            >
              Global Feed
            </a>
          </li>
          <li
            v-if="currTag !== ''"
            class="nav-item"
            >
            <a
              class="nav-link active"
              href="tag"
              ref="tag"
              @click.prevent="loadArticles"
              :data-send="JSON.stringify({ 'tag': currTag })"
            >
              #{{currTag}}
            </a>
          </li>
        </ul>
        <ul
          class="nav nav-pills outline-active"
          v-else
          >
          <li class="nav-item">
            <a
              class="nav-link"
              ref="owner"
              href="owner"
              @click.prevent="loadArticles"
              :data-send="JSON.stringify({ 'author': profileUserName })"
            >
              My Articles
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href=""
              ref="global"
              @click.prevent="loadArticles"
              :data-send="JSON.stringify({ 'favorited': profileUserName })"
            >
              My Favorited Articles
            </a>
          </li>
        </ul>
      </div>
      <div class="paging-wrapper-top col-md-6 col-sm-12">
        <PaginationNew
          class="paging-top"
          v-if="needPaging"
          :currentPage="activePage + 1"
          :maxVisibleButtons=4
          @pagechanged="pagechangedHandler"
        >
        </PaginationNew>
      </div>
    </div>
    <p
      v-if="articlesCount < 1"
      class="has-no-article"

    >
      No article here...
    </p>
    <div
      v-else
      class="preview-holders"
    >
      <Preview
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
      <PaginationNew
        v-if="needPaging"
        :currentPage="activePage + 1"
        :maxVisibleButtons=13
        @pagechanged="pagechangedHandler"
      >
      </PaginationNew>
    </div>
  </div>
</template>

<script>
import Preview from './Preview';
import PaginationNew from './PaginationNew';
import { defaultParam } from '@/utils/api';

import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'Articles',

  props: ['isInHome'],

  components: {
    Preview,
    PaginationNew,
  },

  computed: {
    ...mapState('articles', ['activePage', 'articlesCount']),
    ...mapGetters(['currTag']),
    ...mapGetters('articles', ['articles']),
    ...mapGetters('user', ['loggedUser', 'profileUserName']),
    isLogged () {
      return Object.keys(this.loggedUser).length;
    },
    pages () {
      return [...Array(Math.ceil(this.articlesCount / defaultParam.limit)).keys()]
    },
    needPaging () {
      return (this.pages.length > 1)
    }
  },

  watch: {
    currTag(newVal) {
      if (newVal !== '') {
        this.$refs.owner.classList.remove('active');
        this.$refs.global.classList.remove('active');

        this.$nextTick(() => {
          if (this.$refs.tag) {
            this.$refs.tag.click();
          }
        });
      }
    },

    activePage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$nextTick(() => {
          Object.keys(this.$refs).map((key) => {
            const ref = this.$refs[key];
            if (ref && ref.classList.contains('active')) {
              ref.click();
            }
            return '';
          });
        });
      }
    },

    profileUserName(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.acticeNav();
      }
    },

  },

  methods: {
    ...mapMutations('articles', ['setActivePage']),
    ...mapActions([
      'getTags',
      'setCurrentTag',
    ]),
    ...mapActions('articles', [
      'getArticles',
    ]),

    loadArticles(evt) {
      const target = evt.currentTarget;
      if (target.classList.contains('disabled')) {
        return;
      }
      const offset = defaultParam.limit * this.activePage;
      const data = target.getAttribute('data-send');
      const params = JSON.parse(data);

      if (this.isInHome && (data.indexOf('tag') === -1)) {
        this.setCurrentTag('');
      }

      if (!target.classList.contains('active')) {
        this.setActivePage(0);
      }

      this.$refs.owner.classList.remove('active');
      this.$refs.global.classList.remove('active');

      target.classList.add('active');
      this.getArticles({ ...params, ...{ offset } });
    },

    acticeNav() {
      this.$nextTick(() => {
        this.$refs.global.click();
      });
    },

    pagechangedHandler (page) {
      this.setActivePage(page - 1);
    },

  },

  mounted() {
    this.acticeNav();
  },
};

</script>

<style lang="scss" scoped>
.has-no-article {
  margin-top: 10px;
}
.paging-wrapper-top {
  text-align: right;
  display: block;
  .paging-top {
    margin-top: -15px;
    .pagination {
      margin: 0;
    }
  }
}

i {
  cursor: pointer;
}

.nav-item {
  margin-left: 0;
}

</style>


