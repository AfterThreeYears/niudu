export const cnodeTagMap = {
  ask: '问答',
  job: '招聘',
  share: '分享',
  good: '精华',
  top: '置顶',
};

export const cnodeTagArr = [
  {
    title: '全部',
    tab: 'all',
    type: 'cnode',
  },
  {
    title: '问答',
    tab: 'ask',
    type: 'cnode',
  },
  {
    title: '招聘',
    tab: 'job',
    type: 'cnode',
  },
  {
    title: '分享',
    tab: 'share',
    type: 'cnode',
  },
  {
    title: '精华',
    tab: 'good',
    type: 'cnode',
  },
];

export const v2exTagArr = [
  {
    title: '全部',
    tab: 'all',
  },
  {
    title: '技术',
    tab: 'tech',
  },
  {
    title: '创意',
    tab: 'creative',
  },
  {
    title: '好玩',
    tab: 'play',
  },
  {
    title: 'Apple',
    tab: 'apple',
  },
  {
    title: '酷工作',
    tab: 'jobs',
  },
  {
    title: '交易',
    tab: 'deals',
  },
  {
    title: '城市',
    tab: 'city',
  },
  {
    title: '问与答',
    tab: 'qna',
  },
  {
    title: '最热',
    tab: 'hot',
  },
  {
    title: 'R2',
    tab: 'r2',
  },
];

v2exTagArr.forEach((item) => {
  item.type = 'v2ex';
});
