const cnodeTagMap = {
  ask: '问答',
  job: '招聘',
  share: '分享',
  good: '精华',
  top: '置顶',
};

export const cnodeTag = (item) => {
  if (item.top) {
    return cnodeTagMap.top;
  } else if (item.good) {
    return cnodeTagMap.good;
  }
  return cnodeTagMap[item.tab] || '未知';
};
