export default {
  state: {
    showNav: true,
    showTab: true,
    showHead: true,
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
  },
};
