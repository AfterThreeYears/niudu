import { env } from '@/helpers/ua';
import { getMP } from '@/helpers/bridge';

const ua = env();

const redirect = (url) => {
  location.href = url;
};

const attr = (el, attrName) => el.getAttribute(attrName);

export const LINKS = {
  IOS_DOWNLOAD: 'https://itunes.apple.com/cn/app/mei-pu/id1116579548?l=en&mt=8',
  ANDROID_DOWNLOAD: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meitu.meipu&ckey=CK1354809533729',
  YYB_DOWNLOAD: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meitu.meipu&ckey=CK1354825014512',
  UNIVERSAL_LINKS: `http://redirect.meipu.cn${location.pathname}`, // iOS9.2 之后 universal links 需跨域
  SCHEME: 'meitumeipu://',
  schemeReg: /^meitumeipu/,
};

function getLink(el) {
  const scheme = attr(el, 'data-scheme');
  const link = attr(el, 'data-href');

  if (ua.meipu && scheme) {
    return {
      target: scheme,
      isScheme: true,
    };
  }

  return {
    target: link,
    isScheme: false,
  };
}

const openApp = (el) => {
  const { target, isScheme } = getLink(el);

  // 美铺内
  if (ua.meipu) {
    if (!isScheme) {
      getMP().callWebview({
        url: target,
      });

      return;
    }

    redirect(target);
    return;
  }

  // 美铺外
  if (!isScheme) {
    redirect(target);
  } else {
    redirect(target.replace(/^meitumeipu/, 'https'));
  }
};

export const listenRedirect = (config = {}) => {
  const clickListener = (evt) => {
    let dom = evt.target;

    try {
      while (dom) {
        if (dom.nodeName === 'A' && (attr(dom, 'data-scheme') || attr(dom, 'data-href'))) {
          openApp(dom, config);

          break;
        }

        dom = dom.parentNode;
      }
    } catch (ex) {
      // no handler
    }
  };

  document.removeEventListener('click', clickListener, false);
  document.addEventListener('click', clickListener, false);
};
