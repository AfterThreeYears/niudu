import axios from 'axios';
import moment from 'moment';

moment.locale('zh-cn');
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
      detail.create_atStr = moment(detail.create_at).fromNow();
      // 把所有回复的人取出来
      const obj = {};
      (detail.replies || []).map((item) => {
        obj[item.id] = item.author.loginname;
        item.create_atStr = moment(item.create_at).fromNow();
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
        .get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then(({ data }) => commit('setTopicsDetail', { data }));
    },
  },
};
