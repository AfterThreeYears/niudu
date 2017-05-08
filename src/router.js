import Vue from 'vue';
import Router from 'vue-router';
import Note from './component/Note/Note';
import Hello from './component/Hello/Hello';

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Note,
      },
      {
        path: '/hello',
        component: Hello,
      },
    ],
  });
}
