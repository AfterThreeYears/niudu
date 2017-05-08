import Vue from 'vue';
import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';
import note from './modules/note';
import number0 from './modules/number0';


export default function createStore() {
  const plugins = [];

  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    plugins.push(createLogger({
      collapsed: false,
    }));
  }

  return new Store({
    plugins,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      note,
      number0,
    },
  });
}

// const getters = {
//   num:function (state) {
//     return state.num += 0;
//   }
// }
