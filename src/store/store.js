import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';
import header from './modules/header';
import cnode from './modules/cnode';
import cNodeDetail from './modules/cNodeDetail';
import v2exList from './modules/v2exList';
import v2exDetail from './modules/v2exDetail';
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
      header,
      cnode,
      cNodeDetail,
      v2exList,
      v2exDetail,
      shared,
    },
  });
}
