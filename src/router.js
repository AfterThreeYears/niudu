import Vue from 'vue';
import Router from 'vue-router';

// const CNode = resolve => require(['./component/CNode/CNode'], resolve);
// const CNodeDetail = resolve => require(['./component/CNodeDetail/CNodeDetail'], resolve);
// const V2EX = resolve => require(['./component/V2EX/V2EX'], resolve);
// const V2EXDetail = resolve => require(['./component/V2EXDetail/V2EXDetail'], resolve);
import CNode from '@/component/CNode/CNode';
import CNodeDetail from '@/component/CNodeDetail/CNodeDetail';
import V2EX from '@/component/V2EX/V2EX';
import V2EXDetail from '@/component/V2EXDetail/V2EXDetail';
import Zhihu from '@/component/Zhihu/Zhihu';
// import Test from '@/component/Test';
const Test = resolve => require(['./component/Test'], resolve);
const Test1 = resolve => require(['./component/Test1'], resolve);

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      // console.log(`savedPosition: ${JSON.stringify(savedPosition)}`);
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes: [
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
        meta: { load: true },
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
        meta: { load: true },
      },
      {
        path: '/v2ex/:id',
        component: V2EXDetail,
        name: 'v2exDetail',
      },
      {
        path: '/zhihu',
        component: Zhihu,
        name: 'zhihu',
        meta: { load: true },
      },
      {
        path: '/test',
        component: Test,
        name: 'test',
      },
      {
        path: '/test1',
        component: Test1,
        name: 'test1',
      },
    ],
  });
}
