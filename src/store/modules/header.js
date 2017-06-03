export default {
  namespaced: true,
  state: {
    // 子导航的索引
    subNavIndex: 0,
    isLoading: false,
  },

  mutations: {
    resetSubNavIndex(state) {
      state.subNavIndex = 0;
    },
    setSubNavIndex(state, index) {
      state.subNavIndex = index;
    },
    setLoading(state, type) {
      state.isLoading = type;
    },
  },
};
