import querystring from 'query-string';

/**
 * intelligent logger: compatible production environment logger:
 * if environment is development, logger take effect.
 * if environment is production and match storeKey and storeValue,
 * logger take effect too.
 *
 * we have two logger adator:
 *
 * 1. window, methods: [alert]
 * 2. console, methods: [debug,error,info,log,warn,dir,table,trace,group,groupCollapsed,groupEnd]
 *
 * usage:
 *
 * 1. logger.alert(o: any), final we use window.alert(JSON.stringify(o, null, 2))
 * 2. logger.log(o), just invoke console.log(o)
 *
 * How to match storeKey and storeValue:
 *
 * 1. location.search match [storeKey]:[storeValue]
 * 2. localStroge.getItem(storeKey):storeValue
 */

// unify trigger key/value
const storeKey = '__enable_production_log__';
const storeValue = '__true__';
// calc first, avoid every log exec
const isDoLogger = typeof console !== 'undefined'
  && typeof window !== 'undefined'
  && typeof localStorage !== 'undefined'
  && typeof location !== 'undefined'
  && (localStorage.getItem(storeKey) === storeValue
    || querystring.parse(location.search)[storeKey] === storeValue);
const isProd = process.env.NODE_ENV === 'production';
const windowAdaptor = {
  alert(o) {
    alert(typeof o === 'string' ? o : JSON.stringify(o, null, 2)); // eslint-disable-line no-alert
  },
};
const windowLevels = ['alert'];
const consoleLevels = [
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
];

const doLogger = (level, ...args) => {
  if (!isDoLogger && isProd) return;

  const handler = windowAdaptor[level] ? windowAdaptor : console; // eslint-disable-line no-console

  if (!handler) return;

  const fn = handler[level];

  if (fn) {
    return fn.apply(handler, args);
  }
};

export default [...windowLevels, ...consoleLevels].reduce((result, current) => ({
  ...result,
  [current](...args) {
    return doLogger(current, ...args);
  },
}), {});
