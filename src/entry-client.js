import 'es6-promise/auto';
import 'normalize.css';
import 'github-markdown-css';
import '../public/styles/mobile.css';
import { createApp } from './app';

// client-specific bootstrapping logic...
const { app, store } = createApp();

//  the store should pick up the state before mounting the application:
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

if (initialState) {
  store.replaceState(initialState);
}
// this assumes App.vue template root element has id="app"
app.$mount('#app');
