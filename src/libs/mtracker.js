/**
 * MTracker
 * @version 1.1.2
 * @author ygc@meitu.com
 */

function mtracker (win) {
  const getSeed = (target) => target && target.getAttribute('seed');

  function getTarget(ev) {
    try {
      let node = ev.target;

      while (node && !node.hasAttribute('seed')) {
        node = node.parentNode;
      }

      return node;
    } catch (ex) {
      // handle error
    }
  }

  function logClick(target) {
    const seed = getSeed(target);

    if (!seed) {
      return;
    }

    try {
      win._czc.push([ // eslint-disable-line no-underscore-dangle
        '_trackEvent',
        location.origin + location.pathname,
        seed,
        document.title,
        0,
      ]);
    } catch (ex) {
      // no handle
    }
  }

  class MTracker {
    constructor(opts = {}) {
      if (!opts.cnzzId) {
        console.error('请输入 cnzz id，否则无法记录打点');
      }

      this.opts = opts;
      this.init();
    }

    init() {
      this.insertScript();

      this.history = [];
      this.clickableElements = ['A', 'BUTTON', 'INPUT'];

      this.checkUA();

      // 支持 click 事件的元素
      document.addEventListener('click', (ev) => {
        const target = getTarget(ev);
        if (!target || this.clickableElements.indexOf(target.tagName) === -1) {
          return;
        }

        logClick(target);
      }, false);

      // 不支持 click 事件的元素
      document.addEventListener('touchstart', (ev) => {
        const target = getTarget(ev);
        if (!target || this.clickableElements.indexOf(target.tagName) !== -1) {
          return;
        }

        logClick(target);
      }, false);
    }

    insertScript() {
      const fragment = document.createDocumentFragment();

      const span = document.createElement('span');
      span.setAttribute('id', `cnzz_stat_icon_${this.opts.cnzzId}`);

      const script = document.createElement('script');
      script.src = `https://w.cnzz.com/c.php?id=${this.opts.cnzzId}`;
      script.type = 'text/javascript';
      script.id = 'cnzz-script';

      fragment.appendChild(span);
      fragment.appendChild(script);
      document.getElementsByTagName('head')[0].appendChild(fragment);

      this.scriptEvent();
    }

    scriptEvent() {
      document.querySelector('#cnzz-script').addEventListener('load', () => {
        win._czc = win._czc || []; // eslint-disable-line no-underscore-dangle
        win._czc.push(['_setAccount', String(this.opts.cnzzId)]); // eslint-disable-line no-underscore-dangle
      }, false);
    }

    checkUA() {
      const ua = navigator.userAgent;
      const defaults = ['na', '-1'];
      const os = defaults.slice();
      const engine = defaults.slice();
      const browser = defaults.slice();
      const device = defaults.slice();
      let matches;

      // iOS
      if ((matches = ua.match(/(iPhone|iPad|iPod[A-Z ]*);[ U;]* CPU[A-Z ]*OS ([\d\._]+)?/i))) {
        os[0] = 'iOS';
        os[1] = matches[2].replace(/_/, '.');

        device[0] = matches[1];
      // Android
      } else if ((matches = ua.match(/Android ([\d\._]+)?;/i))) {
        os[0] = 'Android';
        os[1] = matches[1];

        // SAMSUNG
        if (/SAMSUNG|(SGH|SCH|GT|SM)-[A-Z0-9]+/i.test(ua)) {
          device[0] = 'SAMSUNG';

        // LG
        } else if (/LG-/.test(ua)) {
          device[0] = 'LG';

        // Nexus
        } else if (/Nexus \d+ /.test(ua)) {
          device[0] = 'Nexus';
        }
        // XIAOMI

        // HUAWEI

        // VIVO

        // OPPO

        // MEITU
      }

      this.client = [os, engine, browser, device].map((item) => item.join('/')).join('|').toLowerCase();
    }
  }

  return MTracker;
}

function tracker(opts) {
  const M = mtracker(window);
  new M(opts);
}

export default tracker;
