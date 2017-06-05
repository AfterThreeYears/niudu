import axios from 'axios';
import { formatDate } from '@/helpers/time';

export default {
  namespaced: true,
  state: {
    news: {},
    now: Date.now(),
  },

  mutations: {
    setNews(state, { date, stories }) {
      state.news = {
        ...state.news,
        [date]: stories,
      };
    },
  },

  actions: {
    fetchNews({ commit, state }) {
      const { date } = state;
      const url = `http://news-at.zhihu.com/api/4/news/before/${formatDate(date)}`;
      console.log(`GET------${url}`);
      return axios
        .get(url)
        .then(data => commit('setNews', data.res.data));
    },
  },
};
