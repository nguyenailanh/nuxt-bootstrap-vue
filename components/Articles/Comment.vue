<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <router-link
        :to="path"
        class="comment-author"
       >
       {{comment.author.username}}
       </router-link>
      <span class="date-posted">{{comment.createdAt}}</span>
      <span
       v-if="isOwner"
        class="mod-options"
      >
        <i
          class="ion-trash-a"
          @click="onDeleteComment"
        >
        </i>
      </span>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'Comment',
  props: ['comment'],
  computed: {
    ...mapGetters('user', ['loggedUser']),
    ...mapGetters('articles', ['slug']),
    isOwner: vm => (vm.loggedUser.username === vm.comment.author.username),
    path: vm => `/user/${vm.comment.author.username}`,
  },
  methods: {
    ...mapActions('articles', ['deleteComment']),
    onDeleteComment() {
      const data = {
        slug: this.slug,
        id: this.comment.id,
      };
      this.deleteComment(data);
    },
  },
};

</script>
<style lang="scss" scoped>

</style>


