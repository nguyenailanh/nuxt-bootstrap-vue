<template>
  <div>
    <Comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from './Comment';

export default {
  name: 'Comments',
  props: ['comments'],
  components: {
    Comment,
  },
};

</script>

