import axios from 'axios';
const Cookies = require('js-cookie');

export default {
  namespaced: true,
  state: {
    detail: {
      content: {},
      replier: [],
    },
    pageIndex: 1,
    limit: 100,
  },

  mutations: {
    setDetail(state, { data }) {
      state.detail.content = { ...data.content };
      state.detail.replier = [...state.detail.replier, ...data.replier];
    },
    reset(state) {
      state.detail = {
        content: {},
        replier: [],
      };
    },
    increasePage(state) {
      state.pageIndex += 1;
    },
    resetPage(state) {
      state.pageIndex = 1;
    },
    setCookie(state, cookie = []) {
      // console.log(cookie);
      cookie.forEach(({ name, value, secure }) => {
        Cookies.set(
          name,
          value,
          { path: '/v2ex',
            expires: 365,
            secure,
          });
      });
    },
  },

  actions: {
    fetchDetail({ commit }, { id, pageIndex }) {
      console.log(`/v2ex/detail/${id}?pageIndex=${pageIndex}`);
      return axios
        .get(`/v2ex/detail/${id}?pageIndex=${pageIndex}`)
        .then(({ data }) => {
          if (data) {
            commit('setDetail', { data });
          }
          return (data || { replier: '' }).replier.length;
        });
    },
    fetchSignin({ commit }, body) {
      console.log('/v2ex/signin');
      return axios
        .post('/v2ex/signin', body)
        .then(({ data }) => {
          commit('setCookie', data);
        });
    },
    fetchComment({ commit }, body) {
      console.log('/v2ex/reply');
      return axios
        .post('/v2ex/reply', body)
        .then(({ data }) => {
          return data.success;
        });
    },
  },
};
