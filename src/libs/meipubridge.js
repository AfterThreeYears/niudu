// 暂时提交至此，待更换源
/**
 * @version 1.1.0
 * @author bruno yang <ygch1993#gmail.com>
 * @description meipu jsbridge
 */

window.MEIPU_BRIDGE = function(M) {
  const is = (obj) => Object.prototype.toString.call(obj).replace(/\[object (\w+)\]/, '$1').toLowerCase();
  const isStr = (str) => is(str) === 'string';
  const isArray = (arr) => is(arr) === 'array';
  const isNum = (num) => is(num) === 'number';
  const isObj = (obj) => is(obj) === 'object';
  const isBool = (bool) => is(bool) === 'boolean';
  const toStr = (value) => value.toString();
  const verifyUrl = (url) => {
    if (/^https?:\/\//.test(url)) {
      return url;
    }

    throw new Error('illegal url');
  };

  class MP extends M {
    constructor() {
      super();

      this.init();
    }

    init() {
      this.CHANNELS = {
        weixin: '0',
        timeline: '1',
        weibo: '2',
        qq: '3',
        qzone: '4',
      };

      this.CHANNELS_NAME = {
        '0': '微信',
        '1': '朋友圈',
        '2': '微博',
        '3': 'QQ',
        '4': 'QQ 空间',
      };

      this.version = '1.0.0';
    }

    /**
     * 唤起登录界面
     *
     * @returns {Promise}
     *
     * @memberOf MP
     */
    callLoginView() {
      return new Promise((resolve, reject) => {
        this.launchPage('login', (json) => this.call({ resolve, reject, json }));
      });
    }

    /**
     * 判断是否登录
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf MP
     */
    isLogin() {
      return new Promise((resolve, reject) => {
        this.getData('userToken', (json) => {
          try {
            const result = JSON.parse(json);
            return resolve(!!result.data);
          } catch (err) {
            return reject(err.stack);
          }
        });
      });
    }

    /**
     * 获取 user token
     *
     * @returns {Promise<string>}
     *
     * @memberOf MP
     */
    getUserToken() {
      return new Promise((resolve, reject) => {
        this.getData('userToken', (json) => {
          this.call({ json, resolve, reject });
        });
      });
    }
    /**
     * 唤起分享面板
     *
     * @param {array} [channels=Object.keys(this.CHANNELS)]
     * @returns {Promise}
     *
     * @memberOf MP
     */
    callSharePanel(channels = Object.keys(this.CHANNELS)) {
      return new Promise((resolve, reject) => {
        const channelList = [];

        if (isStr(channels) || isNum(channels)) {
          channelList.push(toStr(channels));
        }

        if (isArray(channels)) {
          for (let i = 0; i < channels.length; i++) {
            const channel = toStr(channels[i]).toLowerCase();

            if (this.CHANNELS[channel] !== undefined) {
              channelList.push(this.CHANNELS[channel]);
            }
          }
        }

        this.availableShareChannels(channelList);

        this.launchPage('sharePanel', (json) => this.call({ resolve, reject, json }));
      });
    }

    /**
     * 在新 webview 中打开指定的 url
     *
     * @param {string | object} opts
     * @return {Promise}
     *
     * @memberOf MP
     */
    callWebview(opts) {
      return new Promise((resolve, reject) => {
        const options = {};

        if (isStr(opts)) {
          options.url = verifyUrl(opts);
        } else if (isObj(opts)) {
          const {
            url,
            showShareBtn,
          } = opts;

          options.url = verifyUrl(url);
          options.enableShare = !isBool(showShareBtn) ?
            false :
            showShareBtn;
        } else {
          throw new Error('`callWebview` method argument must be a url string or an object');
        }

        this.launchWebview(JSON.stringify(options), (json) => this.call({ resolve, reject, json}));
      });
    }

    /**
     * 隐藏分享按钮
     *
     * @returns {Promise}
     *
     * @memberOf MP
     */
    hideShareBtn() {
      return new Promise((resolve) => {
        this.enableShare(false, () => resolve());
      });
    }

    /**
     * 显示分享按钮
     *
     * @returns {Promise}
     *
     * @memberOf MP
     */
    showShareBtn() {
      return new Promise((resolve) => {
        this.enableShare(true, () => resolve());
      });
    }

    /**
     * 自定义微信分享信息
     *
     * @param {object} info
     *
     * @memberOf MP
     */
    onRequestWeixinShareInfo(info) {
      this.updateShareInfo(this.CHANNELS.weixin, info);
    }

    /**
     * 自定义朋友圈分享信息
     *
     * @param {object} info
     *
     * @memberOf MP
     */
    onRequestTimelineShareInfo(info) {
      this.updateShareInfo(this.CHANNELS.timeline, info);
    }

    /**
     * 自定义 QQ 分享信息
     *
     * @param {object} info
     *
     * @memberOf MP
     */
    onRequestQQShareInfo(info) {
      this.updateShareInfo(this.CHANNELS.qq, info);
    }

    /**
     * 自定义 QQ 空间分享信息
     *
     * @param {object} info
     *
     * @memberOf MP
     */
    onRequestQZoneShareInfo(info) {
      this.updateShareInfo(this.CHANNELS.qzone, info);
    }

    /**
     * 自定义微博分享信息
     *
     * @param {object} info
     *
     * @memberOf MP
     */
    onRequestWeiboShareInfo(info) {
      this.updateShareInfo(this.CHANNELS.weibo, info);
    }

    /**
     * private
     * 更新分享信息
     *
     * @param {string} channel
     * @param {object} info
     *
     * @memberOf MP
     */
    updateShareInfo(channel, info) {
      if (!isObj(info)) {
        throw new Error(`请传入${this.CHANNELS_NAME[channel]}分享信息`);
      }

      window.MEIPU.shareInfoCollection[channel] = {
        ...window.MEIPU.defaultShareInfo,
        ...info,
      };
    }

    /**
     * private
     * 可用渠道
     * @param {array} channels
     *
     * @memberOf MP
     */
    availableShareChannels(channels) {
      window.MEIPU.channels = channels;
    }

    /**
     * private
     *
     * @param {object} [opts={}]
     * @returns {Promise<string>}
     *
     * @memberOf MP
     */
    call(opts = {}) {
      try {
        const result = JSON.parse(opts.json);
        return opts.resolve(result.data);
      } catch (err) {
        return opts.reject(err);
      }
    }
  }

  const meipu = new MP();
  const ev = new CustomEvent('meipuBridgeReady', { detail: meipu });

  window.dispatchEvent(ev);
};

((win) => {
  if (win.MEIPU) {
    return;
  }

  let MP = null;

  Object.defineProperty(win, 'MEIPU', {
    configurable: false,
    value: (cb) => {
      if (!MP) {
        win.addEventListener('meipuBridgeReady', (message) => {
          MP = message.detail;
          cb(MP);
        });
      } else {
        cb(MP);
      }
    },
  });

  const pickRightPic = () => {
    const imgs = document.getElementsByName('img');
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];

      if (img.naturalWidth >= 300 && img.naturalWidth >= 300) {
        return img.src;
      }
    }

    // 默认缩略图
    return 'http://meipu1.video.meipai.com/FrCfnqKIN7grTUt0i_v2UF_iODQV';
  };

  const createShareCollection = (channels, info) => {
    const collection = {};
    channels.forEach((channel) => {
      collection[channel] = info;
    });
    return collection;
  };

  // 渠道
  win.MEIPU.channels = ['0', '1', '2', '3', '4'];

  // 默认分享信息
  win.MEIPU.defaultShareInfo = {
    title: document.title,
    desc: '',
    link: location.href,
    imgUrl: pickRightPic(),
  };

  // 各渠道分享信息
  win.MEIPU.shareInfoCollection = createShareCollection(
    win.MEIPU.channels,
    win.MEIPU.defaultShareInfo
  );

  win.MEIPU.registCallback = {};
  win.MEIPU.registCallback.requestAvailableShareChannels = (cb) => {
    cb(JSON.stringify(win.MEIPU.channels));
  };
  win.MEIPU.registCallback.requestShareInfo = (channel, cb) => {
    cb(JSON.stringify(win.MEIPU.shareInfoCollection[channel]));
  };
})(window);
