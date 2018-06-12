<template>
  <div class="row article-content">
    <div class="col-md-12">
      <p>
        {{article.description}}
      </p>
      <h2 id="introducing-ionic">{{article.title}}</h2>
      <p>{{article.body}}</p>
        <ul class="tag-list">
          <li
            v-for="tag in article.tagList"
            class="tag-default tag-pill"
            :key="tag"
          >
            {{tag}}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: ['article'],
};

</script>

