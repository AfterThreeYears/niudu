import axios from 'axios';
import { formatDate } from '@/helpers/time';

export default {
  namespaced: true,
  state: {
    news: [],
    date: Date.now(),
  },

  mutations: {
    setNews(state, { date, stories }) {
      state.date -= 24 * 60 * 60 * 1000;
      state.news.push([date, stories]);
    },
  },

  actions: {
    fetchNews({ commit, state }) {
      const url = `http://localhost:9092/zhihu/api/4/news/before/${formatDate(state.date)}`;
      console.log(`GET------${url}`);
      return axios
        .get(url)
        .then(data => commit('setNews', data.res.data));
    },
  },
};
