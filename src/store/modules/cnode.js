import axios from 'axios';
import { dateDiff } from '@/helpers/time';
import { cnodeTag } from '@/helpers/tag';

export default {
  namespaced: true,
  state: {
    list: [],
    page: 1,
    limit: 10,
    tab: 'all',
  },
  mutations: {
    setTopics(state, { data: topics }) {
      (topics || []).map((item) => {
        item.last_reply_at_str = dateDiff(+new Date(item.last_reply_at));
        item.tabStr = cnodeTag(item);
      });
      state.list = [...state.list, ...topics];
      // state.list = [];
    },
    increasePage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
    setTab(state, tab) {
      state.tab = tab;
      state.list = [];
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
          // return (data || []).length;
        });
    },
  },
};
