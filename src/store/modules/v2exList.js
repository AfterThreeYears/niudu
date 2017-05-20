import axios from 'axios';
import { convert2Map } from '@/helpers/data';
import moment from 'moment';

moment.locale('zh-cn');
export default {
  namespaced: true,
  state: {
    entities: {},
    tab: 'all',
  },

  mutations: {
    setTopics(state, { data }) {
      state.entities = {
        ...state.entities,
        ...convert2Map((data || []), 'id'),
      };
    },
    setTab(state, tab) {
      state.entities = {};
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
