/**
 * 检测类型
 */
const toString = Object.prototype.toString;
const is = type => obj => toString.call(obj) === `[object ${type}]`;

export const isRegExp = is('RegExp');

export const isString = is('String');

export const isFunction = is('Function');

export const isObject = is('Object');

export const isArray = is('Array');

export const isNumber = is('Number');

export const isDate = is('Date');


/**
 * 检查 hasOwnProperty
 */
export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
