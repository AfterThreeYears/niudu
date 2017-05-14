import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';
import note from './modules/note';
import cnode from './modules/cnode';
import shared from './modules/shared';

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
      cnode,
      shared,
    },
  });
}
