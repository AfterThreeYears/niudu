export default {
  state: {
    host: null,
    protocol: 'http',
    navigation: null,
    ua: null,
  },

  mutations: {
    setShared(state, {
      host,
      protocol,
      navigation,
      ua,
    }) {
      state.host = host;
      state.protocol = protocol;
      state.navigation = navigation;
      state.ua = ua;
    },
  },
};
