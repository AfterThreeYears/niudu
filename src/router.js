import Vue from 'vue';
import Router from 'vue-router';

// const CNode = resolve => require(['./component/CNode/CNode'], resolve);
// const CNodeDetail = resolve => require(['./component/CNodeDetail/CNodeDetail'], resolve);
// const V2EX = resolve => require(['./component/V2EX/V2EX'], resolve);
// const V2EXDetail = resolve => require(['./component/V2EXDetail/V2EXDetail'], resolve);
// const Test = resolve => require(['./component/Test'], resolve);

import CNode from '@/component/CNode/CNode';
import CNodeDetail from '@/component/CNodeDetail/CNodeDetail';
import V2EX from '@/component/V2EX/V2EX';
import V2EXDetail from '@/component/V2EXDetail/V2EXDetail';
import Test from '@/component/Test';

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/test',
        component: Test,
      },
      {
        path: '/',
        redirect: {
          component: V2EX,
          name: 'v2ex',
        },
      },
      {
        path: '/cnode',
        component: CNode,
        name: 'cnode',
      },
      {
        path: '/cnode/:id',
        component: CNodeDetail,
        name: 'CNodeDetail',
      },
      {
        path: '/v2ex',
        component: V2EX,
        name: 'v2ex',
      },
      {
        path: '/v2ex/:id',
        component: V2EXDetail,
        name: 'v2exDetail',
      },
    ],
  });
}
