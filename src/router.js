import Vue from 'vue';
import Router from 'vue-router';

const CNode = resolve => require(['./component/CNode/CNode'], resolve);
const CNodeDetail = resolve => require(['./component/CNodeDetail/CNodeDetail'], resolve);
const V2ex = resolve => require(['./component/V2ex/V2ex'], resolve);
const v2exDetail = resolve => require(['./component/v2exDetail/v2exDetail'], resolve);
const Test = resolve => require(['./component/Test'], resolve);

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
