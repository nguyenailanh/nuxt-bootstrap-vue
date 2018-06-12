<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="userPage"
        class="author"
      >
        <img :src="image" />
      </router-link>
      <div class="info">
        <router-link
          :to="userPage"
          class="author"
        >
          {{userName}}
        </router-link>
        <span class="date">
          {{createdAt}}
        </span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :disabled="!isLogged"
        :class="{
          'btn-primary': favorited,
          'btn-outline-primary': !favorited,
           disabled: !isLogged
        }"
        @click="handleClick"
      >
        <i class="ion-heart"></i>
        {{favoritesCount}}
      </button>
    </div>
    <router-link
      :to="path"
      class="preview-link"
    >
      <h1>{{title}}</h1>
      <p>{{description}}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in tagList"
          class="tag-default tag-pill tag-outline"
          :key="tag"
        >
          <a
            :href="tag"
            @click.prevent="handleTagClick"
          >
           {{tag}}
          </a>
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'Preview',
  props: [
    'article',
  ],
  computed: {
    ...mapGetters('user', ['loggedUser']),
    isLogged: vm => Object.keys(vm.loggedUser).length,
    image: vm => vm.article.author.image,
    userName: vm => vm.article.author.username,
    userPage: vm => `/user/${vm.userName}`,
    createdAt: vm => vm.article.createdAt,
    favoritesCount: vm => vm.article.favoritesCount,
    title: vm => vm.article.title,
    description: vm => vm.article.description,
    favorited: vm => vm.isLogged ? vm.article.favorited : false,
    path: vm => `/article/${vm.article.slug}`,
    tagList: vm => vm.article.tagList,
    slug: vm => vm.article.slug,
  },

  methods: {
    ...mapActions('articles', ['toggleFavorite']),
    ...mapActions(['setCurrentTag']),

    handleTagClick(evt) {
      const tag = evt.currentTarget.innerText;
      this.setCurrentTag(tag);
    },

    handleClick(evt) {
      if (evt.currentTarget.classList.contains('disabled')) {
        return;
      }

      const data = {
        slug: this.slug,
        isFavorited: this.favorited,
      };

      this.toggleFavorite(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-preview .preview-link ul {
  display: block;
  float: none;
  max-width: 100%;
  padding-top: 10px;
  margin-bottom: 0;
}
</style>

