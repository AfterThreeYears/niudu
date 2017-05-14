import { widgetMap } from '@/constants/widget';
import FieldBanner from '@/fields/Banner/Banner';
import FieldShow from '@/fields/Show/Show';
import FieldBuyer from '@/fields/Buyer/Buyer';
import FieldDrawer from '@/fields/Drawer/Drawer';
import FieldImages from '@/fields/Image/Images';
// import FieldVideo from '@/fields/Video/Video';
import FieldCategory1x4 from '@/fields/Category1x4/Category1x4';
import FieldSingleitemLarge from '@/fields/Singleitem/SingleitemLarge';
import FieldSingleitemSmall from '@/fields/Singleitem/SingleitemSmall';
import FieldSpace from '@/fields/Space/Space';
import FieldItemfall from '@/fields/Itemfall/Itemfall';
// import FieldSubjectCard from '@/fields/SubjectCard/SubjectCard';
import FieldBrandOrCategory1x2 from '@/fields/BrandOrCategory1x2/BrandOrCategory1x2';
import FieldItems1xn from '@/fields/Items1xn/Items1xn';
// import FieldRichText from '@/fields/RichText/RichText';

const codeFieldMap = {
  1002: FieldBanner,
  1003: FieldCategory1x4,
  1004: FieldDrawer,
  1007: FieldSingleitemLarge,
  1008: FieldSingleitemSmall,
  1009: FieldItemfall,
  1010: FieldImages,
  1011: FieldItems1xn,
  1012: FieldBrandOrCategory1x2,
  1013: FieldBuyer,
  1014: FieldShow,
  1015: FieldSpace,
  // 1017: FieldVideo, // 视频卡片
  // 1018: FieldSubjectCard, // 专题卡片
  // 1019: FieldRichText,
};

export const fieldMap = Object.keys(codeFieldMap).reduce((result, code) => {
  const field = codeFieldMap[code];
  const { initial } = field.exports;

  return {
    ...result,
    [code]: {
      ...widgetMap[code],
      field,
      initial,
    },
  };
}, {});
