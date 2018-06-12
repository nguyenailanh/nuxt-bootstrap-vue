<template>
  <div class="article-meta">
    <router-link
      :to="path"
    >
      <img :src="image"/>
    </router-link>
    <div class="info">
      <router-link
        class="author"
        :to="path"
      >
        {{username}}
      </router-link>
      <span class="date">{{article.createdAt}}</span>
    </div>
    <div
      v-if="following"
      class="actions"
      >
      <button
        class="btn btn-sm btn-secondary"
        v-if="!isOwner"
        @click="onFollowClickHandler"
        :disabled="!isLogged"
      >
        <i class="ion-minus-round"></i>
        Unfollow {{username}}
      </button>
      <button
        v-if="favorited"
        class="btn btn-sm btn-primary"
        :disabled="!isLogged"
        @click.prevent="onFavoriteClickHandler"
      >
        <i class="ion-heart"></i>
        Unfavorite Post
        <span class="counter">
          ({{favoritesCount}})
        </span>
      </button>
      <button
        v-else
        class="btn btn-sm btn-outline-primary"
        :disabled="!isLogged"
        @click.prevent="onFavoriteClickHandler"
      >
        <i class="ion-heart"></i>
        Favorite Post
        <span class="counter">
          ({{favoritesCount}})
        </span>
      </button>
    </div>
    <div
      v-else
      class="actions"
      >
      <button
        class="btn btn-sm btn-secondary"
        v-if="!isOwner"
        :disabled="!isLogged"
        @click="onFollowClickHandler"
      >
        <i class="ion-plus-round"></i>
        Follow {{username}}
      </button>
      <button
        v-if="favorited"
        class="btn btn-sm btn-primary"
        :disabled="!isLogged"
        @click.prevent="onFavoriteClickHandler"
      >
        <i class="ion-heart"></i>
        Unfavorite Post
        <span class="counter">
          ({{favoritesCount}})
        </span>
      </button>
      <button
        v-else
        class="btn btn-sm btn-outline-primary"
        :disabled="!isLogged"
        @click.prevent="onFavoriteClickHandler"
      >
        <i class="ion-heart"></i>
        Favorite Post
        <span class="counter">
          ({{favoritesCount}})
        </span>
      </button>
    </div>
    <span
      v-if="isOwner"
      class="owner-action"
    >
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="path2Article">
        <i class="ion-edit"></i>
          Edit Article
      </router-link>
      <button
        class="btn btn-outline-danger btn-sm"
        @click="onDeleteArticle"
      >
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </span>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'Meta',
  props: ['article'],
  computed: {
    ...mapGetters('user', ['loggedUser']),
    author() {
      return this.article.author || {}
    },
    username() {
      return this.author.username
    },
    image() {
      return this.author.image
    },
    path() {
      return `/user/${this.username}`
    },
    following() {
      return  this.author.following
    },
    favorited() {
      return (this.isLogged) ? this.article.favorited: false
    },
    favoritesCount() {
      return this.article.favoritesCount
    },
    isOwner() {
      return this.loggedUser.username === this.username
    },
    isLogged() {
      return Object.keys(this.loggedUser).length
    },
    slug() {
      return this.article.slug
    },
    path2Article() {
      return `/postarticle/${this.slug}`
    },
  },
  methods: {
    ...mapActions('articles', [
      'toggleFavorite',
      'doFollowUser',
      'deleteArticle',
    ]),

    onFavoriteClickHandler() {
      const data = {
        slug: this.slug,
        isFavorited: this.favorited,
      };

      this.toggleFavorite(data);
    },

    onFollowClickHandler() {
      const data = {
        username: this.username,
        isFollow: !this.following,
      };

      this.doFollowUser(data);
    },

    onDeleteArticle() {
      this.deleteArticle()
        .then(() => {
          this.$router.push('/')
        });
    },
  },
};

</script>

<style lang="scss" scoped>
.actions {
  display: inline;
  button {
    margin-left: 5px;
  }
  .btn {
    margin-left: 5px;
  }
}
.owner-action {
  margin-left: 5px;
  .btn {
    margin-left: 5px;
  }
}
.date {
  margin-top: 2px;
}
</style>
