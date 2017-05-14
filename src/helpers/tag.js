import { cnodeTagMap } from '@/config/tabs';

export const cnodeTag = (item) => {
  if (!item) return '';
  if (item.top) {
    return cnodeTagMap.top;
  } else if (item.good) {
    return cnodeTagMap.good;
  }
  return cnodeTagMap[item.tab] || '未知';
};
