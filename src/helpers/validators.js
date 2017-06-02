const createRule = (rule, value, callback, customRule, invalidMsg) => {
  if (!customRule(value)) {
    callback(new Error(invalidMsg));
    return false;
  }

  callback();
  return true;
};

/**
 * 校验链接是否以 http:// 或 https:// 开头
 * @param  {Object}   rule     校验规则
 * @param  {String}   value    url
 * @param  {Function} callback element-ui 内部传入的校验回调
 * @return {Boolean}           校验是否通过
 */
const testHttp = value => /^https?:\/\//.test(value);
export const isHttpPrefix = (rule, value, callback) => createRule(
  rule,
  value,
  callback,
  testHttp,
  '跳转链接需以 http:// 或 https:// 开头',
);

/**
 * 校验是否包含前后空格
 * @param  {Object}   rule     校验规则
 * @param  {String}   value    需要校验的字符串
 * @param  {Function} callback element-ui 内部传入的校验回调
 * @return {Boolean}           校验是否通过
 */
const testSpace = value => !/^\s+|\s+$/.test(value);
export const noSpaces = (rule, value, callback) => createRule(
  rule,
  value,
  callback,
  testSpace,
  '请检查输入内容是否含有空格',
);

/**
 * 校验是否为数字
 * @param  {Object}   rule     校验规则
 * @param  {String}   value    需要校验的字符串
 * @param  {Function} callback element-ui 内部传入的校验回调
 * @return {Boolean}           校验是否通过
 */
const testDigital = value => /^\d+$/.test(value);
export const isDigital = (rule, value, callback) => createRule(
  rule,
  value,
  callback,
  testDigital,
  '请输入正确的 id',
);
