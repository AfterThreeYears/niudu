const isProd = process.env.NODE_ENV === 'production';
const base = [
  {
    title: 'V2EX-666666666666',
    id: 0,
    url: 'v2ex',
  },
  {
    title: 'NodeJS-FUCKFUCKFUCKFUCKFUCK',
    id: 1,
    url: 'cnode',
  },
];

const test = [
  {
    title: '知乎日报',
    id: 2,
    url: 'zhihu',
  },
  {
    title: 'test',
    id: 2,
    url: 'test',
  },
];

let nav = [];

if (isProd) {
  nav = [
    ...base,
  ];
} else {
  nav = [
    ...base,
    ...test,
  ];
}

export default nav;
