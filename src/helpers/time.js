/**
 * formate to 00
 * @param {*} str
 */
const handleTime = (str) => {
  if (`${str}`.length === 1) {
    return `0${str}`;
  }
  return str;
};

/**
 * create HMS
 * @param {*} duration seconds
 */
export const prettyHMS = (duration) => {
  const second = Math.floor(duration);
  let time = `00:${handleTime(second)}`;
  if (second > 60) {
    const min = Math.floor(second / 60);
    time = `${handleTime(min)}:${handleTime(second % 60)}`;
    if (min > 60) {
      const hour = Math.floor(min / 60);
      time = `${handleTime(hour)}:${handleTime(min % 60)}:${handleTime(second % 60)}`;
    }
  }
  return time;
};

export const dateDiff = (hisTime, nowTime) => {
  if (!arguments.length) return '';
  const now = typeof nowTime === 'number' ? nowTime : Date.now();
  const diffValue = now - hisTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  const resultYear = diffValue / year;
  const resultMonth = diffValue / month;
  const resultWeek = diffValue / (7 * day);
  const resultDay = diffValue / day;
  const resultHour = diffValue / hour;
  const resultMin = diffValue / minute;

  if (resultYear >= 1) return `${parseInt(resultYear, 10)}年前`;
  if (resultMonth >= 1) return `${parseInt(resultMonth, 10)}个月前`;
  if (resultWeek >= 1) return `${parseInt(resultWeek, 10)}周前`;
  if (resultDay >= 1) return `${parseInt(resultDay, 10)}天前`;
  if (resultHour >= 1) return `${parseInt(resultHour, 10)}个小时前`;
  if (resultMin >= 1) return `${parseInt(resultMin, 10)}分钟前`;
  return '刚刚';
};

// return 20170605
export const formatDate = (now) => {
  const d = new Date(now || Date.now());
  const month = d.getMonth() + 1;
  const monthStr = `${month}`.length === 1 ? `0${month}` : month;
  const date = d.getDate();
  const dateStr = `${date}`.length === 1 ? `0${date}` : date;
  return `${d.getFullYear()}${monthStr}${dateStr}`;
};
