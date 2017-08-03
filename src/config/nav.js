const isProd = process.env.NODE_ENV === 'production';
const base = [
  {
    title: 'V2EX',
    id: 0,
    url: 'v2ex',
  },
  {
    title: 'NodeJS',
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
