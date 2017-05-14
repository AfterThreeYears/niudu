import WidgetDrawer from '@/widgets/Drawer/Drawer';
import WidgetShow from '@/widgets/Show/Show';
import WidgetBanner from '@/widgets/Banner/Banner';
import WidgetBuyer from '@/widgets/Buyer/Buyer';
import WidgetImages from '@/widgets/Image/Images';
import WidgetVideo from '@/widgets/Video/Video';
import WidgetCategory1x4 from '@/widgets/Category1x4/Category1x4';
import WidgetSingleitemLarge from '@/widgets/Singleitem/SingleitemLarge';
import WidgetSingleitemSmall from '@/widgets/Singleitem/SingleitemSmall';
import WidgetSpace from '@/widgets/Space/Space';
import WidgetItemfall from '@/widgets/Itemfall/Itemfall';
import WidgetSubjectCard from '@/widgets/SubjectCard/SubjectCard';
import WidgetBrandOrCategory1x2 from '@/widgets/BrandOrCategory1x2/BrandOrCategory1x2';
import WidgetItems1xn from '@/widgets/Items1xn/Items1xn';
// import WidgetRichText from '@/widgets/RichText/RichText';

const codeWidgetMap = {
  1002: WidgetBanner,
  1003: WidgetCategory1x4,
  1004: WidgetDrawer,
  1007: WidgetSingleitemLarge,
  1008: WidgetSingleitemSmall,
  1009: WidgetItemfall,
  1010: WidgetImages,
  1011: WidgetItems1xn,
  1012: WidgetBrandOrCategory1x2,
  1013: WidgetBuyer,
  1014: WidgetShow,
  1015: WidgetSpace,
  1017: WidgetVideo,
  1018: WidgetSubjectCard,
  // 1019: WidgetRichText,
};

export const widgetMap = Object.keys(codeWidgetMap).reduce((result, code) => {
  const widget = codeWidgetMap[code];
  const { name, label } = widget.exports;

  return {
    ...result,
    [code]: {
      name,
      label,
      widget,
    },
  };
}, {});
