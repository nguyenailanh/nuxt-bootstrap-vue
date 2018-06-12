<template>
  <div
    class="home-page"
  >
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        <p>Made by Vue.js</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <Articles :isInHome="true"/>
        <Tags />
      </div>
    </div>
  </div>
</template>

<script>

import Tags from '@/components/Tags/Tags';
import Articles from '@/components/Articles/Articles';

import {
  mapActions,
} from 'vuex';

export default {
  name: 'HomePage',

  components: {
    Articles,
    Tags,
  },

  head () {
    return {
      title: 'NUXT Home Page',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  mounted() {
    this.getTags();
  },

  beforeDestroy() {
    this.setCurrentTag('');
  },

  methods: {
    ...mapActions([
      'getTags',
      'setCurrentTag',
    ]),
  },
};

</script>

<style lang="scss" scoped>
  .home-page {

    .banner {
      background: #41b883;
      box-shadow:
        inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
        inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
    }
  }
</style>

