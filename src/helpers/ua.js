export const env = (userAgent) => {
  const ua = (userAgent || navigator.userAgent).toLowerCase();
  const android = /android|adr/gi.test(ua);
  const iOS = /iphone|ipod|ipad/gi.test(ua) && !android;
  const qq = /qq/gi.test(ua);
  const weChat = /MicroMessenger/gi.test(ua);
  const weibo = /weibo/gi.test(ua);
  const limited = qq || weChat || weibo;
  const meipu = /com\.meitu\.meipu/gi.test(ua);

  const osVersion = ua.match(/iphone os (\d*)/);
  const supportUniversalLink = osVersion && osVersion[1] >= 9;

  return {
    ua,
    android,
    iOS,
    qq,
    weChat,
    weibo,
    limited,
    meipu,
    supportUniversalLink,
  };
};
