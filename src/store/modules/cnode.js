import axios from 'axios';
import { dateDiff } from '@/helpers/time';
import { cnodeTag } from '@/helpers/tag';
import moment from 'moment';

moment.locale('zh-cn');
export default {
  namespaced: true,
  state: {
    entities: {},
    page: 1,
    limit: 10,
    tab: 'all',
  },
  mutations: {
    setTopics(state, { data: topics }) {
      state.limit = 20;
      (topics || []).map((item) => {
        item.last_reply_at_str = dateDiff(+new Date(item.last_reply_at));
        item.tabStr = cnodeTag(item);
      });
      state.entities = [...state.entities, ...topics];
    },
    increasePage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
    setTab(state, tab) {
      state.tab = tab;
      state.entities = [];
    },
  },

  actions: {
    fetchTopics({ commit, state }) {
      const { page, tab, limit } = state;
      return axios
        .get('https://cnodejs.org/api/v1/topics', {
          params: {
            page,
            tab,
            limit,
          },
        })
        .then(({ data }) => {
          commit('setTopics', { data });
          return (data || '').length;
        });
    },
  },
};
