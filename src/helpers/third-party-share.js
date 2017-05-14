import jsonp from 'jsonp';
import logger from './logger';
import { env } from './ua';
import { loadScript } from './utils';

let ua;
let canDebug = false;

const libraryUrl = {
  WeChat: '//res.wx.qq.com/open/js/jweixin-1.2.0.js',
  QQ: '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',
  Qzone: '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339',
};
let options = {
  shareData: {
    title: '',
    image: '',
    description: '',
    link: '',
    onSuccess() {},
  },
  wxConfig: {
    debug: canDebug,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
    ],
  },
};

function wechatShareInfo(data, type) {
  return {
    title: data.title,
    desc: data.summary,
    link: data.url,
    imgUrl: data.pic,
    type: '',
    dataUrl: '',
    success() {
      if (data.callback) {
        data.callback(type);
      }
    },
  };
}

function initWeChat(data) {
  if (!data.WXconfig) return;

  loadScript(libraryUrl.WeChat, (wx) => {
    logger.debug('share on wechat', data, wx);

    if (!wx.config) wx = window.wx;

    const conf = data.WXconfig;

    wx.config({
      debug: canDebug,
      appId: conf.appId,
      timestamp: conf.timestamp,
      nonceStr: conf.nonceStr,
      signature: conf.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
      ],
    });

    wx.error(logger.log);

    wx.ready(() => {
      wx.onMenuShareAppMessage(wechatShareInfo(data, 'weixin'));
      wx.onMenuShareQQ(wechatShareInfo(data, 'qq'));
      wx.onMenuShareQZone(wechatShareInfo(data, 'qzone'));
      wx.onMenuShareTimeline(wechatShareInfo(data, 'timeline'));
    });
  });
}

function initQQ(data) {
  const info = {
    title: data.title,
    desc: data.summary,
    share_url: data.url,
    image_url: data.pic,
  };

  function doQQShare() {
    logger.debug('share on qq', data);

    try {
      if (data.callback) {
        window.mqq.ui.setOnShareHandler((type) => {
          if (type === 3 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
            info.title = data.summary;
          } else {
            info.title = data.title;
          }
          info.share_type = type;
          info.back = true;
          window.mqq.ui.shareMessage(info, (result) => {
            if (result.retCode === 0) {
              data.callback.call(this, result);
            }
          });
        });
      } else {
        window.mqq.data.setShareInfo(info);
      }
    } catch (error) {
      logger.log(error);
    }
  }

  if (window.mqq) {
    doQQShare();
  } else {
    loadScript(libraryUrl.QQ, doQQShare);
  }
}

function initQZone(data) {
  const { QZAppExternal } = window;

  function doQZShare() {
    logger.debug('share on qzone', data);

    if (QZAppExternal && QZAppExternal.setShare) {
      const imageArr = [];
      const titleArr = [];
      const summaryArr = [];
      const shareURLArr = [];

      for (let i = 0; i < 5; i += 1) {
        imageArr.push(data.pic);
        shareURLArr.push(data.url);
        if (i === 4 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
          titleArr.push(data.summary);
          summaryArr.push(data.title);
        } else {
          titleArr.push(data.title);
          summaryArr.push(data.summary);
        }
      }

      QZAppExternal.setShare(() => {}, {
        type: 'share',
        image: imageArr,
        title: titleArr,
        summary: summaryArr,
        shareURL: shareURLArr,
      });
    }
  }

  if (QZAppExternal) {
    doQZShare();
  } else {
    loadScript(libraryUrl.Qzone, doQZShare);
  }
}

function shareInfo(share) {
  const { wxConfig } = options;
  const info = {
    title: share.title,
    summary: share.description,
    pic: share.imageUrl,
    url: share.link,
    WXconfig: {
      appId: wxConfig.appId,
      timestamp: wxConfig.timestamp,
      nonceStr: wxConfig.nonceStr,
      signature: wxConfig.signature,
    },
    callback(shareTo) {
      share.onSuccess(shareTo);
    },
  };

  if (ua.weChat) {
    initWeChat(info);
  } else if (ua.qq) {
    initQQ(info);
  } else if (ua.qzone) {
    initQZone(info);
  }
}

function thirdPartyShare(opts) {
  ua = env();
  options = { ...options, ...opts };

  if (ua.weChat) {
    canDebug = location.hostname !== 'm.meipu.cn';

    jsonp(`http://xiuxiu.huodong.meitu.com/public/index/wx_token?${new Date().getTime()}`, {
      param: `url=${location.href.split('#')[0]}&callback`,
    }, (err, data) => {
      if (err) {
        logger.log('something wrong when parse wechat response', data, err);
        return;
      }

      options.wxConfig = { ...options.wxConfig, ...data };

      logger.debug('share options', options);

      shareInfo(options.shareData);
    });
  }

  if (ua.qzone || ua.qq) {
    shareInfo(options.shareData);
  }
}

export default thirdPartyShare;
