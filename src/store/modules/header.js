export default {
  namespaced: true,
  state: {
    showNav: true,
    showTab: true,
    showHead: true,
    tagArrs: [],
    // 子导航的索引
    subNavIndex: 0,
    isLoading: false,
  },

  mutations: {
    setNav(state, { status }) {
      state.showNav = status;
    },
    setTabs(state, { status }) {
      state.showTab = status;
    },
    setHead(state, { status }) {
      state.showHead = status;
    },
    allShow(state) {
      state.showNav = true;
      state.showTab = true;
      state.showHead = true;
    },
    setTagArrs(state, tagArrs) {
      state.tagArrs = [...tagArrs];
    },
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
