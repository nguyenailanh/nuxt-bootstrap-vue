<template>
  <form class="card comment-form">
    <div class="card-block">
      <textarea
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
        ref="comment-el"
        v-model="body"
        name="comment"
      >
    </textarea>
    </div>
    <div class="card-footer">
      <img
        :src="loggedUser.image"
        class="comment-author-img"
      />
      <button
        class="btn btn-sm btn-primary"
        @click.prevent="onClickButton"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>

<script>
import {
  mapActions,
} from 'vuex';


export default {
  name: 'AddComment',

  data() {
    return {
      body: '',
    };
  },

  props: [
    'loggedUser',
    'slug',
  ],

  methods: {
    ...mapActions('articles', ['postComment']),
    onClickButton() {
      this.postComment({ slug: this.slug, body: this.body });
      this.$refs['comment-el'].value = '';
    },
  },
};

</script>

