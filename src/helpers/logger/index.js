const doConsole = (level, ...args) => {
  if (typeof console === 'undefined') return;

  const fn = console[level]; // eslint-disable-line no-console
  const isDev = process.env.NODE_ENV !== 'production';
  const enableByLocalStorage = typeof localStorage !== 'undefined' && localStorage.getItem('vinci_enable_production_log');
  if (fn && (isDev || enableByLocalStorage)) {
    fn.apply(console, args);
  }
};

export default [
  'debug',
  'error',
  'info',
  'log',
  'warn',
  'dir',
  'table',
  'trace',
  'group',
  'groupCollapsed',
  'groupEnd',
].reduce((result, current) => ({
  ...result,
  [current](...args) {
    return doConsole(current, ...args);
  },
}), {});
