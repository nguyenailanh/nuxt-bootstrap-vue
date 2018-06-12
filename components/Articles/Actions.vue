<template>
  <div class="article-actions">
    <Meta :article="article" />
  </div>
</template>

<script>
import Meta from './Meta';

export default {
  name: 'Actions',
  props: ['article'],
  components: {
    Meta,
  },
};

</script>

