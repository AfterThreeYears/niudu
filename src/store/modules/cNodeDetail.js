import axios from 'axios';
import { cnodeTag } from '@/helpers/tag';
import moment from 'moment';
// import isempty from 'lodash.isempty';

moment.locale('zh-cn');
export default {
  namespaced: true,
  state: {
    detail: {},
  },

  getters: {
    detailReplyLength: state => (state.detail.replies || {}).length,
  },

  mutations: {
    setTopicsDetail(state, { data: detail }) {
      if (detail) {
        detail.tabStr = cnodeTag(detail.tab);
        detail.create_atStr = moment(detail.create_at).fromNow();
        // 把所有回复的人取出来
        const obj = {};
        (detail.replies || []).map((item) => {
          obj[item.id] = item.author.loginname;
        });
        // 回复列表
        (detail.replies || []).map((item) => {
          item.create_atStr = moment(item.create_at).fromNow();
          item.reply_name = obj[item.reply_id] || '';
        });
      }
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
