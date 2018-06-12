<template>
   <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmitHandler">
          <fieldset>
            <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  required
                  name="title"
                  v-model="dataSend['title']"
                />
            </fieldset>
            <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="What's this article about?"
                  name="description"
                  v-model="dataSend['description']"
                />
            </fieldset>
            <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  required
                  placeholder="Write your article (NO markdown)"
                  name="body"
                  v-model="dataSend['body']"
                >
                </textarea>
            </fieldset>
            <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags - seperated by comma"
                  name="tagList"
                  v-model="dataSend['tagList']"
                />
                <div class="tag-list"></div>
            </fieldset>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit">
                {{isEditMode ? 'Save' : 'Publish'}} Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'PostArticlePage',
  data() {
    return {
      dataSend: {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    };
  },

   meta: {
    requiresAuth: true
  },

  head () {
    return {
      title: 'NUXT Post New Article',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  computed: {
    ...mapGetters('user', ['loggedUser']),
    ...mapGetters('articles', [
      'article',
    ]),
    isEditMode() {
      return this.$route.params.id
    }
  },

  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.bindDataToForm();
      }
    },
  },

  mounted() {
    this.bindDataToForm();
  },

  methods: {
    ...mapActions('articles', ['updateArticle']),
    bindDataToForm() {
      if (this.isEditMode) {
        const {
          slug,
          title,
          description,
          body,
          tagList,
        } = this.article;

        this.dataSend = {
          slug,
          title,
          description,
          body,
          tagList,
        };
      } else {
        this.dataSend = {
          slug: '',
          title: '',
          description: '',
          body: '',
          tagList: '',
        };
      }
    },

    onSubmitHandler() {
      let {
        tagList,
      } = this.dataSend;

      tagList = (typeof tagList === 'string')
      ? tagList.split(',').map(tag => tag.trim())
      : tagList;

      const param = { ...this.dataSend, tagList };

      this.updateArticle(param).then((article) => {
        this.$router.replace(`/article/${article.slug}`)
      });
    },
  },
};

</script>
