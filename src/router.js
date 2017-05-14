import Vue from 'vue';
import Router from 'vue-router';
import CNode from '@/component/CNode/CNode';
import CNodeDetail from '@/component/CNode/CNodeDetail';
import V2EX from '@/component/V2EX/V2EX';

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/cnode',
      },
      {
        path: '/cnode',
        component: CNode,
      },
      {
        path: '/cnode/:id',
        component: CNodeDetail,
        name: 'CNodeDetail',
      },
      {
        path: '/v2ex',
        component: V2EX,
      },
    ],
  });
}
