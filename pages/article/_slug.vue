<template>
  <div class="article-page">
    <Banner
      v-if="article.author"
      :article="article"
    />
    <div class="container page">
      <Content :article="article" />
      <Actions :article="article" />
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <AddComment
            v-if="isLogged"
            :loggedUser="loggedUser"
            :slug="slug"
          />
          <p v-else>
            <router-link to="/authens/login">
              Login &nbsp;
            </router-link>
            or  &nbsp;
            <router-link to="/authens/signup">
              Signup &nbsp;
            </router-link>
            to add comment this post
          </p>
          <Comments
            :comments="comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Actions from '@/components/Articles/Actions';
import Banner from '@/components/Articles/Banner';
import Content from '@/components/Articles/Content';
import AddComment from '@/components/Articles/AddComment';
import Comments from '@/components/Articles/Comments';

import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'ArticleDetail',
  components: {
    Banner,
    Content,
    Actions,
    AddComment,
    Comments,
  },

  computed: {
    ...mapGetters('user', ['loggedUser']),
    ...mapGetters('articles', [
      'article',
      'comments',
    ]),
    isLogged() {
      return Object.keys(this.loggedUser).length
    },
    slug() {
      return this.$route.params.slug
    }
  },

  head () {
    return {
      title: `NUXT ${this.article.title}`,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  beforeMount() {
    this.getArticleDetail(this.slug);
  },

  methods: {
    ...mapActions('articles', [
      'getArticleDetail',
    ]),
  },

};

</script>

