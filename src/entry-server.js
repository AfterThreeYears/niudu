import { createApp } from './app';


// since there could potentially be asynchronous route hooks or components,
// we will be returning a Promise so that the server can wait until
// everything is ready before rendering.
export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  // set server-side router's location
  router.push(context.url);
<<<<<<< HEAD

  // wait until router has resolved possible async components and hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes, reject with 404
    if (!matchedComponents.length) {
      reject({ code: 404 });
    }
    // console.log('matchedComponents', matchedComponents);
=======

  // wait until router has resolved possible async components and hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes, reject with 404
    if (!matchedComponents.length) {
      reject({ code: 404 });
    }

>>>>>>> b56bc8c... fix: eslint fix
    // call asyncData() on all matched route components
    Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
        });
      }
    })).then(() => {
      // After all preFetch hooks are resolved, our store is now
      // filled with the state needed to render the app.
      // When we attach the state to the context, and the `template` option
      // is used for the renderer, the state will automatically be
      // serialized and injected into the HTML as window.__INITIAL_STATE__.
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
});
