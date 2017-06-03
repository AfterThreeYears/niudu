import axios from 'axios';

export default {
  namespaced: true,
  state: {
    entities: [],
    tab: 'all',
  },

  mutations: {
    setTopics(state, { data }) {
      state.entities = [...data];
    },
    setTab(state, tab) {
      state.entities = [];
      state.tab = tab;
    },
  },

  actions: {
    fetchTopics({ commit, state }) {
      const { tab } = state;
      console.log(`GET------/v2ex/list/${tab}`);
      return axios
        .get(`/v2ex/list/${tab}`)
        .then(({ data }) => commit('setTopics', { data }));
    },
  },
};
