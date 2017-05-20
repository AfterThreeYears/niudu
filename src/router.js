import Vue from 'vue';
import Router from 'vue-router';
import CNode from '@/component/CNode/CNode';
import CNodeDetail from '@/component/CNode/CNodeDetail';
import V2ex from '@/component/V2EX/V2EX';
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
          component: CNode,
          name: 'cnode',
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
        component: V2ex,
        name: 'v2ex',
      },
    ],
  });
}
