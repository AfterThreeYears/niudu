import axios from 'axios';
import { convert2Map } from '@/helpers/data';
import { dateDiff } from '@/helpers/time';
import { cnodeTag } from '@/helpers/tag';

export default {
  state: {
    entities: {},
  },

  mutations: {
    setchTopics(state, { data: topics }) {
      (topics || []).map((item) => {
        item.last_reply_at_str = dateDiff(+new Date(item.last_reply_at));
        item.tabStr = cnodeTag(item);
      });
      state.entities = {
        ...state.entities,
        ...convert2Map(topics, 'id'),
      };
    },
  },

  actions: {
    fetchTopics({ commit }, { page, tab, limit, mdrender }) {
      return axios
        .get('https://cnodejs.org/api/v1/topics', {
          params: {
            page,
            tab,
            limit,
            mdrender,
          },
        })
        .then(({ data }) => commit('setchTopics', { data }));
    },
  },
};
