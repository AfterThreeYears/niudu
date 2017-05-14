import axios from 'axios';
import { convert2Map } from '@/helpers/data';
import { dateDiff } from '@/helpers/time';
import { cnodeTag } from '@/helpers/tag';
import moment from 'moment';

moment.locale('zh-cn');
export default {
  state: {
    entities: {},
    page: 1,
    limit: 10,
    tab: 'all',
    detail: {},
  },

  getters: {
    replyLength: state => state.detail.replies.length,
  },

  mutations: {
    setTopics(state, { data: topics }) {
      state.limit = 20;
      (topics || []).map((item) => {
        item.last_reply_at_str = dateDiff(+new Date(item.last_reply_at));
        item.tabStr = cnodeTag(item);
      });
      state.entities = {
        ...state.entities,
        ...convert2Map(topics, 'id'),
      };
    },
    setPage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
    setTab(state, tab) {
      state.tab = tab;
      state.entities = {};
    },
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
      state.detail = detail;
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
        .then(({ data }) => commit('setTopics', { data }));
    },
    fetchTopicsDetail({ commit }, { id }) {
      return axios
        .get(`https://cnodejs.org/api/v1/topic/${id}`)
        .then(({ data }) => commit('setTopicsDetail', { data }));
    },
  },
};
