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

