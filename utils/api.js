import axios from 'axios';
import 'es6-promise/auto';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

let headers = {};

export const checkLogged = () => (Object.keys(headers).length);

export const defaultParam = {
  limit: 10,
  offset: 0,
};

export const updateHeader = (token) => {
  headers = (token)
  ? {
    Authorization: `Token ${token}`,
  }
  : {};
};

export const clearLoggedUser = () => {
  Cookies.remove('vuex-realworld');
};

export const doSignup = payload => (axios.post('/users', JSON.stringify(payload)));

export const doLogin = userData => (
  axios.post(
   '/users/login',
    JSON.stringify(userData),
  )
);

export const doUpdate = payload => (
  axios.put(
    '/user',
    JSON.stringify(payload),
    { headers },
  )
);

export const doGetUserApi = () => (
  axios({
    method: 'GET',
    url: '/user',
    headers,
  })
);

export const doGetTags = () => (
  axios.get(
    '/tags',
  )
);

export const doGetArticles = (pParams) => {
  const isFeed = pParams.isFeed;
  const params = { ...defaultParam, ...pParams };

  const options = {
    method: 'get',
    url: isFeed ? '/articles/feed' : '/articles',
    headers,
    params,
  };

  return axios(options);
};

export const doToggleFavorite = (slug, isFavorited) => {
  const options = {
    method: isFavorited ? 'delete' : 'post',
    url: `/articles/${slug}/favorite`,
    headers,
    data: '',
  };

  return axios(options);
};

export const doUpdateArticle = (payload) => {
  const {
    slug,
    title,
    description,
    body,
    tagList,
  } = payload;

  const options = {
    method: (slug === '') ? 'post' : 'put',
    url: (slug === '') ? '/articles' : `/articles/${slug}`,
    headers,
    data: {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
  };

  return axios(options);
};

export const doDeleteArticle = (slug) => {
  const options = {
    method: 'DELETE',
    url: `/articles/${slug}`,
    headers,
  };

  return axios(options);
};

export const doDeleteComment = ({ slug, id }) => {
  const options = {
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
    headers,
  };

  return axios(options);
};

export const doGetArticle = (slug) => {
  const options = {
    method: 'GET',
    url: `/articles/${slug}`,
    headers,
  };

  return axios(options);
};

export const doGetComments = (slug) => {
  const options = {
    method: 'GET',
    url: `/articles/${slug}/comments`,
    headers,
  };

  return axios(options);
};

export const doPostComment = (payload) => {
  const {
    slug,
    comment,
  } = payload;

  const options = {
    method: 'POST',
    url: `/articles/${slug}/comments`,
    headers,
    data: {
      comment: {
        body: comment,
      },
    },
  };

  return axios(options);
};

export const doGetProfile = (username) => {
  const options = {
    method: 'get',
    url: `/profiles/${username}`,
    headers,
  };

  return axios(options);
};

export const doToggleFollowUser = (payload) => {
  const { username, following } = payload;

  const options = {
    method: (following) ? 'POST' : 'DELETE',
    url: `/profiles/${username}/follow`,
    headers,
  };

  return axios(options);
};
