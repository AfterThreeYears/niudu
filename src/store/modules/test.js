

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    set(state, topics) {
      state.list = [...topics];
    },
  },

  actions: {
    fetch({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('set', [1, 2, 3]);
          resolve();
        }, 3000);
      });
    },
  },
};
