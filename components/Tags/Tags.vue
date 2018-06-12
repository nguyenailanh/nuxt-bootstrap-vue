<template>
  <div class="col-md-3">
    <div class="sidebar">
    <p>Popular Tags</p>

    <div class="tag-list">
      <a
        v-for="(tag, index) in tags"
        :key="index"
        :href="tag"
        class="tag-pill tag-default"
        :class="{'tag-outline': tag !== currTag}"
        @click.prevent="handleTagClick"
      >
        {{tag}}
      </a>
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
  name: 'Tags',

  computed: {
    ...mapGetters(['tags', 'currTag']),
  },

  methods: {
    ...mapActions(['setCurrentTag']),
    ...mapActions('articles', ['setActivePage']),
    handleTagClick(evt) {
      const tag = evt.currentTarget.innerText;
      this.setCurrentTag(tag);
      this.setActivePage(0);
    },
  },
};

</script>

