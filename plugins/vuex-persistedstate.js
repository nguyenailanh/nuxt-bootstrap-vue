import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

export default ({ store }) => {
  createPersistedState({
      key: 'vuex-realworld',
      paths: [],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, {expires: 365})
  })(store)
}