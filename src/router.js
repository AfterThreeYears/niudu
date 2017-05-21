import Vue from 'vue';
import Router from 'vue-router';
import CNode from '@/component/CNode/CNode';
import CNodeDetail from '@/component/CNodeDetail/CNodeDetail';
import V2ex from '@/component/V2EX/V2EX';
import v2exDetail from '@/component/V2EXDetail/V2EXDetail';
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
          component: V2ex,
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
        component: V2ex,
        name: 'v2ex',
      },
      {
        path: '/v2ex/:id',
        component: v2exDetail,
        name: 'v2exDetail',
      },
    ],
  });
}
