import 'es6-promise/auto';
import 'normalize.css';
import 'github-markdown-css';
import '../public/styles/mobile.css';
import { createApp } from './app';

// client-specific bootstrapping logic...
const { app, store, router } = createApp();

//  the store should pick up the state before mounting the application:
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

if (initialState) {
  store.replaceState(initialState);
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    // 从详情返回列表页不用asyncData
    const fromStatus = from.meta.load;
    const toStatus = to.meta.load;
    // console.log(`fromStatus ${fromStatus}--- toStatus ${toStatus}`);
    if ((fromStatus && toStatus) ||
        (fromStatus && !toStatus)) {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;
      const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));
      if (!activated.length) {
        return next();
      }
      Promise.all(activated.map((c) => {
        if (c.asyncData) c.asyncData({ store, route: to });
      })).then(() => {
        next();
      }).catch(next);
    } else {
      return next();
    }
  });

  // actually mount to DOM
  app.$mount('#app');
});
// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
