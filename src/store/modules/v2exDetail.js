import axios from 'axios';

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
  },

  actions: {
    fetchDetail({ commit }, { id, pageIndex }) {
      console.log(`/v2ex/detail/${id}?pageIndex=${pageIndex}`);
      return axios
        .get(`/v2ex/detail/${id}?pageIndex=${pageIndex}`)
        .then(({ data }) => {
          commit('setDetail', { data });
          return (data || { replier: '' }).replier.length;
        });
    },
  },
};
