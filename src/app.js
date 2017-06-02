import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import { createRouter } from './router';
import createStore from './store/store';
import initAxios from './axios';
import App from './App.vue';
import badge from './ui/badge';
import toolBar from './ui/toolBar';
import Icon from './ui/icon/Icon';

initAxios();
Vue.use(Vuex);
Vue.component(badge.name, badge);
Vue.component(Icon.name, Icon);
Vue.component(toolBar.name, toolBar);

const store = createStore();
const router = createRouter();

sync(store, router);

export const createApp = () => {
  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
};
