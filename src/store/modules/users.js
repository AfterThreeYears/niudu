import axios from 'axios';
import { convert2Map } from '@/helpers/data';

export default {
  state: {
    entities: {},
  },

  mutations: {
    setUser(state, { data: user }) {
      state.entities = {
        ...state.entities,
        ...convert2Map(user, 'userId'),
      };
    },

    entitiesMergeUser(state, userEntities) {
      state.entities = {
        ...state.entities,
        ...userEntities,
      };
    },
  },

  actions: {
    fetchUser({ commit }, { id }) {
      // console.log('用哦过户');
      return axios
        .post('/cms/manage/users', { userId: id })
        .then(({ data }) => {
          // console.log('返回值', data);
          commit('setUser', { data });
          return data;
        });
    },
    fetchUserTest({ commit }) {
      // console.log('用哦过户');
      return axios
        .get('/api/test')
        .then(({ data }) => {
          // console.log('返回值', data);
          commit('setUser', { data });
          return data;
        });
    },
  },
};
