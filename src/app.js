import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import { createRouter } from './router';
import createStore from './store/store';
import initAxios from './axios';
import App from './App.vue';

initAxios();
Vue.use(Vuex);

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
