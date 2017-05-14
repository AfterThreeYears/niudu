export const channelNames = {
  mtxxopenstatic: 'mtxxopenstatic', // 美图秀秀开屏（静态）
  mtxxiconfirst: 'mtxxiconfirst', // 美图秀秀首屏 icon
  mtxxiconsec: 'mtxxiconsec', // 美图秀秀第二屏 icon
  mtxxbeijingban: 'mtxxbeijingban', // 美图秀秀背景版

  myxjopenstatic: 'myxjopenstatic', // 美颜相机开屏（静态）
  myxjiconfirst: 'myxjiconfirst', // 美颜相机首屏 icon
  myxjiconseven: 'myxjiconseven', // 美颜相机第七格 icon
  myxjbeijingban: 'myxjbeijingban', // 美图秀秀背景版

  mzxjiconfirst: 'mzxjiconfirst', // 美妆相机首屏 icon

  mttticonfirst: 'mttticonfirst', // 美图贴贴首屏 icon

  hbgciconfirst: 'hbgciconfirst', // 海报贴贴首屏 icon

  main: 'main', // fallback
};

export const cnzzIDs = {
  [channelNames.mtxxbeijingban]: '1261608429',
  [channelNames.myxjbeijingban]: '1261608437',
  [channelNames.mtxxiconsec]: '1261622050',
  [channelNames.myxjiconseven]: '1261622603',
  [channelNames.main]: '1261873822',
};

export const downloadLinks = {
  [channelNames.mtxxopenstatic]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/uaQfmu',
    android: 'http://meipu.dl.meitu.com/MTXXicon.apk',
  },
  [channelNames.mtxxiconfirst]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/uaQfmu',
    android: 'http://meipu.dl.meitu.com/MTXXicon.apk',
  },
  [channelNames.mtxxiconsec]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/RVbIve',
    android: 'http://meipu.dl.meitu.com/mtxx-2ndscreen.apk',
  },
  [channelNames.mtxxbeijingban]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/mArQji',
    android: 'http://meipu.dl.meitu.com/mtxxbeijingban.apk',
  },

  [channelNames.myxjopenstatic]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/j6Nb2e',
    android: 'http://meipu.dl.meitu.com/MYXJspicon.apk',
  },
  [channelNames.myxjiconfirst]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/j6Nb2e',
    android: 'http://meipu.dl.meitu.com/MYXJspicon.apk',
  },
  [channelNames.myxjiconseven]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/i6VZfm',
    android: 'http://meipu.dl.meitu.com/myxjicon.apk',
  },
  [channelNames.myxjbeijingban]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/JN7vY3',
    android: 'http://meipu.dl.meitu.com/myxjbeijingban.apk',
  },

  [channelNames.mzxjiconfirst]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/2mM7b2',
    android: 'http://meipu.dl.meitu.com/MZXJicon.apk',
  },

  [channelNames.mttticonfirst]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/v2ENNj',
    android: 'http://meipu.dl.meitu.com/MTTTicon.apk',
  },

  [channelNames.hbgciconfirst]: {
    iOS: 'https://click.meitustat.com/meitu-ad-api/R7FzEv',
    android: 'http://meipu.dl.meitu.com/HBGCicon.apk',
  },
};

export const getCNZZID = (channel) => {
  if (channelNames[channel]) {
    return cnzzIDs[channel];
  }

  return cnzzIDs[channelNames.main];
};

export const getDownloadLinks = (channel) => {
  if (channelNames[channel]) {
    return downloadLinks[channel];
  }

  return downloadLinks[channelNames.hbgciconfirst];
};
