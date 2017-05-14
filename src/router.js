import Vue from 'vue';
import Router from 'vue-router';
import CNode from '@/component/CNode/CNode';

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    mode: 'history',
    routes: [
      {
        path: '/',
        component: CNode,
      },
    ],
  });
}
