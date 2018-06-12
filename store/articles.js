import {
    doGetArticles,
    doGetArticle,
    doGetComments,
    doPostComment,
    doToggleFavorite,
    doToggleFollowUser,
    doDeleteComment,
    doDeleteArticle,
    doUpdateArticle,
  } from '@@/utils/api';

import logger from '@@/utils';

/*  eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  articles: [],
  article: {},
  comments: [],
  articlesCount: 0,
  activePage: 0,
});

export const getters = {
  articles: ({ articles }) => articles,
  article: ({ article }) => article,
  comments: ({ comments }) => comments,
  slug: ({ article }) => article.slug,
};

export const mutations = {
  setArticles: (state, { articles, articlesCount }) => {
    const newArticles = articles.map((article) => {
      const item = article;
      item.createdAt = (new Date(item.createdAt)).toLocaleString();
      return item;
    });

    state.articles = newArticles;
    state.articlesCount = articlesCount;
  },

  setArticle: (state, article) => {
    const item = article;
    item.createdAt = (new Date(item.createdAt)).toLocaleString();

    state.article = item;
  },

  setActivePage: (state, page) => {
    state.activePage = page;
  },

  updateArticles: (state, { slug, favorited, favoritesCount }) => {
    const newArticles = state.articles.map((article) => {
      let item = article;
      if (item.slug === slug) {
        item = { ...item, favorited, favoritesCount };
      }

      return item;
    });

    state.articles = newArticles;
  },

  updateArticle: (state, { favorited, favoritesCount }) => {
    const newArticle = { ...state.article, favorited, favoritesCount };
    state.article = newArticle;
  },

  updateArticleAuthor: (state, following) => {
    state.article.author.following = following;
  },

  setComments: (state, comments) => {
    const listComment = comments.map((comment) => {
      const item = comment;
      item.createdAt = (new Date(item.createdAt)).toLocaleString();
      return item;
    });

    state.comments = listComment;
  },

  addComment: (state, comment) => {
    const comments = state.comments;
    comments.unshift(comment)
    state.comments = comments;
  },
  removeComment: (state, commentId) => {
    const comments = state.comments.filter(comment => comment.id !== commentId);

    state.comments = comments;
  },
};

export const actions = {
  async getArticles({ commit }, params) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { articles, articlesCount } } = await doGetArticles(params);
      commit('setArticles', { articles, articlesCount });
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async toggleFavorite({ commit }, { slug, isFavorited }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { article: { favorited, favoritesCount } } } =
      await doToggleFavorite(slug, isFavorited);

      commit('updateArticles', { slug, favorited, favoritesCount });
      commit('updateArticle', { favorited, favoritesCount });
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async getArticleDetail({ commit, dispatch }, slug) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { article } } = await doGetArticle(slug);
      await commit('setArticle', article);
      commit('setLoading', false, { root: true });

      dispatch('getArticleComments', slug);
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async getArticleComments({ commit }, slug) {
    try {
      commit('setError', '', { root: true });

      const { data: { comments } } = await doGetComments(slug);
      commit('setComments', comments);
    } catch (error) {
      commit('setError', error.response.data, { root: true });
    }
  },

  async postComment({ getters, commit }, { slug, body }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { comment } } = await doPostComment({ slug, comment: body });
      commit('addComment', comment);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async doFollowUser({ commit }, { username, isFollow }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { profile: { following } } }
      = await doToggleFollowUser({ username, following: isFollow });
      commit('updateArticleAuthor', following);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async deleteComment({ commit }, { slug, id }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      await doDeleteComment({ slug, id });
      commit('removeComment', id);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async deleteArticle({ commit, getters }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      await doDeleteArticle(getters.slug);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  async updateArticle({ commit }, articleData) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { article } } = await doUpdateArticle(articleData);
      commit('setLoading', false, { root: true });
      commit('setArticle', article);
      return article;
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data, { root: true });
    }
  },

  setActivePage ({ commit }, activePage) {
    commit('setActivePage', activePage)
  }
};
