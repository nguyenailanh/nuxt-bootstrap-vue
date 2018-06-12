import {
  doGetTags,
} from '@/utils/api';

import logger from '@/utils';

export const namespaced = true;

/*  eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const state = () => ({
  tags: [],
  currTag: '',
  loading: false,
  error: ''
});

export const getters = {
  tags: ({ tags }) => tags,
  currTag: ({ currTag }) => currTag,
};

export const mutations = {
  setTags: (state, tags) => {
    state.tags = tags;
  },

  setCurrentTag: (state, tag) => {
    state.currTag = tag;
  },

  setLoading: (state, loading) => {
    state.loading = loading;
  },

  setError: (state, error) => {
    state.error = error;
  },
};

export const actions = {
  async getTags({ commit }) {
    try {
      const { data: { tags } } = await doGetTags();
      commit('setTags', tags);
    } catch (error) {
      logger(error, 'LOGIN');
    }
  },

  setCurrentTag({ commit }, tag) {
    commit('setCurrentTag', tag);
  },
};
