import axios from 'axios';

export default {
  namespaced: true,
  state: {
    noteList: [],
    curNote: {},
  },

  mutations: {
    addNote(state, oneNote) {
      state.noteList = [...state.noteList, oneNote];
    },
    removeNote(state) {
      const index = state.noteList.indexOf(state.curNote);
      state.noteList.splice(index, 1);
      state.curNote = state.noteList[0];
    },
    allNote(state) {
      return state.noteList;
    },
    toggleLike(state) {
      state.curNote.love = !state.curNote.love;
    },
    save(state) {
      localStorage.note = JSON.stringify(state.noteList);
    },
    updateTitle(state, { value }) {
      state.curNote.brandName = value;
    },
    updateContent(state, { value }) {
      state.curNote.content = value;
    },
    setCurNote(state, curNote) {
      state.curNote = curNote;
    },
    initData(state, noteList) {
      // console.log('请求数据11');
      // localStorage.note ||
      // console.log(`请求完成----${JSON.stringify(noteList)}`);
      state.noteList = [...noteList];
    },
  },

  actions: {
    initData({ commit }) {
      // console.log('请求数据');
      return axios
        .get('/cms/item/queryItemsByIds?itemIds=222222222722,222222222713')
        .then(({ data }) => {
          commit('initData', data);
        });
    },
    add({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('addNote', {
            brandName: '日记',
            productNameZH: '内容...',
            love: false,
          });
          resolve();
        }, 1000);
      });
    },
    remove({ commit }) {
      return new Promise((resolve) => {
        commit('removeNote');
        resolve();
      });
    },
    all({ commit }) {
      commit('allNote');
    },
    save({ commit }) {
      commit('save');
    },
    toggleLike({ commit }, index) {
      commit('toggleLike', index);
    },
  },

  // getters: {
  //   noteTitleMap(state) {
  //     return state.noteList.map(item => item.title);
  //   },
  // },
};
