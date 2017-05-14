const position = {
  data() {
    return {
      savedPositions: {},
    };
  },

  methods: {
    backupPosition(key) {
      this.savedPositions[key] = window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
    },

    restorePosition(key) {
      window.scrollTo(0, this.savedPositions[key] || 0);
    },
  },
};

export default position;
