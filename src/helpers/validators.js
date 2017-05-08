/**
 * 校验链接是否以 http:// 或 https:// 开头
 * @param  {Object}   rule     校验规则
 * @param  {String}   value    url
 * @param  {Function} callback element-ui 内部传入的校验回调
 * @return {Boolean}           校验是否通过
 */
export const isHttpPrefix = (rule, value, callback) => {
  const urlReg = /^https?:\/\//;
  if (urlReg.test(value)) {
    callback();
  } else {
    callback(new Error('跳转链接需以 http:// 或 https:// 开头'));
    return false;
  }

  return true;
};

/**
 * 校验是否仅包含空格字符
 * @param  {Object}   rule     校验规则
 * @param  {String}   value    需要校验的字符串
 * @param  {Function} callback element-ui 内部传入的校验回调
 * @return {Boolean}           校验是否通过
 */
export const notOnlySpaces = (rule, value, callback) => {
  value = value.trim();
  if (value === '') {
    callback(new Error('不能只有空格的～搞事情呐亲'));
    return false;
  }

  callback();
  return true;
};
