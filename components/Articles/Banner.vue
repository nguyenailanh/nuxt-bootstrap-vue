<template>
  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <Meta
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import Meta from './Meta';

export default {
  name: 'Banner',
  props: ['article'],
  components: {
    Meta,
  },
};

</script>

