import {
  doSignup,
  doLogin,
  doUpdate,
  doGetProfile,
  doToggleFollowUser,
} from '@@/utils/api';

import logger from '@@/utils';

export const state = () => ({
  loggedUser: {},
  profile: {},
});

/*  eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
export const getters = {
  loggedUser: (state) => {
    return state.loggedUser
  },
  profile: ({ profile }) => profile,
  profileUserName: ({ profile }) => profile.username,
  isAuthen : ({ loggedUser }) => !!Object.keys(loggedUser).length
};

export const mutations = {
  doLoginSuccess: (state, user) => {
    state.loggedUser = user;
  },

  setProfile: (state, profile) => {
    state.profile = profile;
  },
};

export const actions = {
  async doLoginRequest({ commit, dispatch }, userData) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { user } } = await doLogin({ user: userData });

      dispatch('doLoginSuccess', user);
      commit('setLoading', false, { root: true });
      return true
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data.errors, { root: true });
    }
  },

  doLoginSuccess({ commit }, userData) {
    commit('doLoginSuccess', userData);
  },

  async doSignupRequest({ commit, dispatch }, userData) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { user } } = await doSignup({ user: userData });
      dispatch('doLoginSuccess', user);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setError', error.response.data.errors, { root: true });
    }
  },

  async doProfileRequest({ commit }, username) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { profile } } = await doGetProfile(username);
      commit('setProfile', profile);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data.errors, { root: true });
    }
  },

  async doUpdateSettings({ commit }, userData) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { user } } = await doUpdate(userData);
      commit('doLoginSuccess', user);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data.errors, { root: true });
    }
  },

  async doFollowUser({ commit }, { username, isFollow }) {
    try {
      commit('setLoading', true, { root: true });
      commit('setError', '', { root: true });

      const { data: { profile } }
      = await doToggleFollowUser({ username, following: isFollow });
      commit('setProfile', profile);
      commit('setLoading', false, { root: true });
    } catch (error) {
      commit('setLoading', false, { root: true });
      commit('setError', error.response.data.errors, { root: true });
    }
  },
};
