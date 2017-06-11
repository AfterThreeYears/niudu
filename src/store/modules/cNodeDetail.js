import axios from 'axios';
import { dateDiff } from '@/helpers/time';

const baseUrl = 'https://cnodejs.org/api/v1';

export default {
  namespaced: true,
  state: {
    detail: {
      author: {},
    },
  },

  getters: {
    detailReplyLength: state => (state.detail.replies || {}).length,
  },

  mutations: {
    setTopicsDetail(state, { data: detail }) {
      state.detail = {};
      detail.create_atStr = dateDiff(new Date(detail.create_at));
      // 把所有回复的人取出来
      const obj = {};
      (detail.replies || []).map((item) => {
        obj[item.id] = item.author.loginname;
        item.create_atStr = dateDiff(new Date(item.create_at));
      });
      // 回复列表
      // 把列表里面所有的id和name先存到map里，然后第二次循环就可以取到所有回复的人了
      (detail.replies || []).map((item) => {
        item.reply_name = obj[item.reply_id] || '';
      });
      // console.log(`设置detail ${JSON.stringify(state.detail)}, ${JSON.stringify(detail.replies)}`);
      state.detail = (detail || {});
    },
  },

  actions: {
    fetchTopicsDetail({ commit }, { id }) {
      return axios
        .get(`${baseUrl}/topic/${id}`)
        .then(({ data }) => commit('setTopicsDetail', { data }));
    },
    fetchComment({ commit }, body) {
      body.content = `${body.content}
      来自[web版牛读](https://github.com/AfterThreeYears/niudu)`;
      return axios
        .post(`${baseUrl}/topic/${body.id}/replies`, body)
        .then(({ data }) => data);
    },
    validateLogined({ commit }, accesstoken) {
      return axios
        .post(`${baseUrl}/accesstoken`, {
          accesstoken,
        })
        .then(res => res.data);
    },
  },
};
